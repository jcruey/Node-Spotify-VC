// Include Server Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var sp = require('./sp.js');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var swig = require('swig');
var passport = require('passport');
var SpotifyStrategy = require('./lib/index').Strategy;
var consolidate = require('consolidate');
var SpotifyWebApi = require('spotify-web-api-node');
var appKey = process.env.appKey;
var appSecret = process.env.appSecret;

var trackList = [];
var currentIndex = 0;
var dwplaylistID = "";
var rrplaylistID = "";

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session. Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing. However, since this example does not
//   have a database of user records, the complete spotify profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use the SpotifyStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and spotify
//   profile), and invoke a callback with a user object.
passport.use(new SpotifyStrategy({
  clientID: appKey,
  clientSecret: appSecret,
  callbackURL: 'http://localhost:3000/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      console.log('accessToken: ' + accessToken);
      // console.log(profile);
      profile.accessToken = accessToken;
      // To keep the example simple, the user's spotify profile is returned to
      // represent the logged-in user. In a typical application, you would want
      // to associate the spotify account with a user record in your database,
      // and return that user instead.
      return done(null, profile, accessToken);
    });
  }));

// Create Instance of Express
var app = express();
var PORT = process.env.PORT || 3000; // Sets an initial port. We'll use this later in our listener

// Run Morgan for Logging
app.use(logger('dev'));
app.use(cookieParser());
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(session({ secret: 'keyboard cat' }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('./public'));
app.engine('html', consolidate.swig);

// -------------------------------------------------

// use mongoose to connect to the database 
mongoose.connect('mongodb://localhost/spotifyVC');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to the DB successfully!");
});

// MongoDB Configuration configuration (Change this URL to your own DB)
var Schema = mongoose.Schema
var spotifySchema = new Schema({
  username: String,
  savedTracks:  [],
  favTracks: [],
  releaseRadar: [],
  discoverWeekly: [],
  playlists: []
});

var userschema = mongoose.model('userschema', spotifySchema); 
// -------------------------------------------------

// Main Route. This route will redirect to our rendered React application
app.get('/', function(req, res){
  res.render('login.html', { user: req.user });
});

app.get('/home', function(req, res){
	res.render('../public/home.html', { user: req.user });
});

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account.html', { user: req.user });
});

app.get('/tracks', function(req, res) {
  // Set the credentials when making the request 
  var spotifyApi = new SpotifyWebApi({
  accessToken : req.user.accessToken
  });

  // Get tracks in the signed in user's Your Music library 
  spotifyApi.getMySavedTracks({
    limit : 40
  })
  .then(function(data) {
    console.log('Done!');
    var trackObj = data.body.items
;    // for (var i = 0; i<trackObj.length; i++) {
    //   console.log('------------------------------------------');
    //   console.log('Track: ' + trackObj[i].track.name);
    //   console.log('Album: ' + trackObj[i].track.album.name);
    //   console.log('Artist: ' + trackObj[i].track.artists[0].name);
    //   console.log('Uri: ' + trackObj[i].track.uri);
    //   console.log('------------------------------------------');
    // }
    userschema.findOne({"username": req.user.username}).exec(function(err, user){
      user.savedTracks = trackObj;
      user.save(function(){
        res.send(trackObj);
      });
    });
  }, function(err) {
    console.log('Something went wrong!', err);
});
spotifyApi.getUserPlaylists(req.user.username)
  .then(function(data) {
    // console.log(data);
    var playlistObj = data.body.items;
    userschema.findOne({"username": req.user.username}).exec(function(err, user){
      console.log('playistObj ', playlistObj);
      user.playlists = playlistObj;
      user.save(function(){
        console.log('saved User playlists to DB');
        dwplaylistID = user.playlists[1].id;
        rrplaylistID = user.playlists[0].id;
      });
    });
  }, function(err) {
    console.log("err ", err);
  });
});

app.get('/favoriteTracks', function(req, res) {
  // Set the credentials when making the request 
  var spotifyApi = new SpotifyWebApi({
  accessToken : req.user.accessToken
  });
  // Get tracks in the signed in user's Your Music library 
  spotifyApi.getMyTopTracks()
  .then(function(data) {
    console.log('Done!');
    var favTrackObj = data.body.items;
    
    var tracks = [];
    for (var i = 0; i<favTrackObj.length; i++) {
      tracks.push({track: favTrackObj[i]});
    //   console.log('------------------------------------------');
    //   console.log('Track: ' + favTrackObj[i].name);
    //   console.log('Album: ' + favTrackObj[i].album.name);
    //   console.log('Artist: ' + favTrackObj[i].artists[0].name);
    //   console.log('Uri: ' + favTrackObj[i].uri);
    //   console.log('------------------------------------------');
    }
    trackList = tracks;
    userschema.findOne({"username": req.user.username}).exec(function(err, user){
      user.favTracks = tracks;
      user.save(function(){
        res.send(tracks);
      });
    });

  }, function(err) {
    console.log('Something went wrong!', err);
});
});

app.get('/discoverWeekly', function(req, res) {
  // Set the credentials when making the request 
  var spotifyApi = new SpotifyWebApi({
  accessToken : req.user.accessToken
  });
  // Get tracks in the signed in user's Your Music library 
  // Retrieve new releases
    spotifyApi.getPlaylist('spotifydiscover', dwplaylistID)
  .then(function(data) {
    var playlistTracks = data.body.tracks.items
      trackList = data.body.tracks.items;
      console.log('DW update ', trackList);
    console.log("Discover Weekly");
    // for (var i = 0; i<playlistTracks.length; i++) {
    //   console.log('------------------------------------------');
    //   console.log('Track: ' + playlistTracks[i].track.name);
    //   console.log('Album: ' + playlistTracks[i].track.album.name);
    //   console.log('Artist: ' + playlistTracks[i].track.artists[0].name);
    //   console.log('Uri: ' + playlistTracks[i].track.uri);
    //   console.log('------------------------------------------');
    // }
    userschema.findOne({"username": req.user.username}).exec(function(err, user){
      user.discoverWeekly = playlistTracks;
      user.save(function(){
        res.send(playlistTracks);
      });
    });
  
  }, function(err) {
    console.log('Something went wrong!', err);
});
});

app.get('/newTracks', function(req, res) {
  // Set the credentials when making the request 
  var spotifyApi = new SpotifyWebApi({
  accessToken : req.user.accessToken
  });
  // Get tracks in the signed in user's Your Music library 
  // Retrieve new releases
    spotifyApi.getPlaylist('spotify', rrplaylistID)
  .then(function(data) {
    var playlistTracks = data.body.tracks.items
      trackList = data.body.tracks.items;
      console.log('RR update ', trackList);
    console.log("Release Radar");
    // for (var i = 0; i<playlistTracks.length; i++) {
    //   console.log('------------------------------------------');
    //   console.log('Track: ' + playlistTracks[i].track.name);
    //   console.log('Album: ' + playlistTracks[i].track.album.name);
    //   console.log('Artist: ' + playlistTracks[i].track.artists[0].name);
    //   console.log('Uri: ' + playlistTracks[i].track.uri);
    //   console.log('------------------------------------------');
    // }
    userschema.findOne({"username": req.user.username}).exec(function(err, user){
      user.releaseRadar = playlistTracks;
      user.save(function(){
        res.send(playlistTracks);
      });
    });
    
  }, function(err) {
    console.log('Something went wrong!', err);
  });
  
});
  
app.post('/spotifyLogin', function(req, res){
    sp.sp(req.body.userName, req.body.Password);
    res.redirect('/auth/spotify');
})

// GET /auth/spotify
//   Use passport.authenticate() as route middleware to authenticate the
//   request. The first step in spotify authentication will involve redirecting
//   the user to spotify.com. After authorization, spotify will redirect the user
//   back to this application at /auth/spotify/callback
app.get('/auth/spotify',
  passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private', 'user-library-read', 'user-top-read', 'playlist-read-private'], showDialog: true}),
  function(req, res){
// The request will be redirected to spotify for authentication, so this
// function will not be called.
});

// GET /auth/spotify/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request. If authentication fails, the user will be redirected back to the
//   login page. Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  function(req, res) {
    userschema.findOne({"username": req.user.username}).exec(function(err, user){
      if (!user) {
        var user = new userschema({
          username: req.user.username
        });
        user.save(function(){
          res.redirect('/home');
        });
      } else {
        res.redirect('/home');
      }
    });
  });

app.get('/logout', function(req, res){
  sp.logout();
  req.logout();
  res.redirect('/');
});

// Route to hit play function for player
app.post('/play', function(req, res){
  // console.log('Req.body: ', req.body);
  trackList = req.body.tracks;
  currentIndex = req.body.index;
  console.log('currently loaded ', trackList);
  var trackObj = {
    uri: trackList[currentIndex].track.uri
  }
  console.log('Current Track: ', trackObj);
  console.log('Song Playing: ', trackList[currentIndex].track.name, trackObj.uri);
  sp.play(trackObj)
   sp.progress(trackList, currentIndex, function(){
    // currentIndex++ 
    // globalSocket.emit('show next album art', currentIndex)
   });
  res.send('200');
});

// Route to hit pause function for player
app.post('/pause', function(req, res){
  sp.pause();
  res.send('200');
});

// Route to hit stop function for player
app.post('/stop', function(req, res){
  sp.stop();
  res.send('200');
});

app.post('/checkIndex', function(req, res){
  currentIndex = global.currentIndex;
  var updateData = {index: currentIndex}
  res.send(updateData);
})

// -------------------------------------------------

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed. Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
};
