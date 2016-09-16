var LibSpotify = require('./lib/spotify');
var appKeyPath = './spotify_appkey.key';
var spotify = new LibSpotify({appkeyFile: appKeyPath});	

exports.sp = function(userName, Password) {
	spotify.login(userName, Password)
  .then(function () {
    //logged in
    // console.log("logged in successfully");
  })
  .catch(function (err) {
  	console.log(err);
    //wrong username and/or password
  });

}

exports.play = function(track) {
	if (spotify.player.playing != true) {
		spotify.player.play(track);
		spotify.player.on('play', function (track) { 
		/* play event */ 
		console.log('song playing!' + spotify.player.playing);
		console.log(spotify.player.playing);
		});
	}
	else {
		spotify.player.stop();
		spotify.player.play(track);
	}
}

exports.pause = function() {
	spotify.player.pause();
	spotify.player.on('pause', function () { 
		console.log('song paused');
	/* pause event */ });
}

exports.stop = function() {
	spotify.player.stop();
	spotify.player.on('stop', function () { 
		console.log('song stopped');
	/* stop event */ });
}

exports.progress = function(trackList, index, callback) {
	global.currentIndex = index;
	
	spotify.player.on('progress', function (progress) {
		// console.dir(progress);
		console.log(trackList[global.currentIndex].track.name);
		console.log('globalindex', global.currentIndex);
		console.log('tracklistlength', trackList.length);

		if (global.currentIndex >= trackList.length-1) return;
		
		if (progress.elapsed >= progress.duration){
		 	console.log('track ended')
		 	global.currentIndex++;
		 	console.log(global.currentIndex);
		 	this.play(trackList[global.currentIndex].track)
		 	callback();  
	 	}
	 /* progress event */ });	


}

exports.logout = function() {
	console.log(spotify);
	spotify._onLogout();
}

