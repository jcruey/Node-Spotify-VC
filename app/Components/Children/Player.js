// Include React 
var React = require('react');
var helpers = require('../utils/helpers.js');


// This is the player component. 
var Player = React.createClass({

	
	// Here we set a generic state associated with the text being searched for
	getInitialState: function() {
		return {
			savedTracks: "",
			trackArt: [],
			currentTrackName: "",
			currentTrackElapsed: "",
			index: 0
		}
	},

	componentDidMount: function(){
		// this.turnOnSockets
	},

	turnOnSockets: function(){
		socket.on('show next album art', function(nextIndex){

		});
	},

	// When a user submits... 
	handleClickPlay: function(i){
		var i = this.props.index;
		console.log(i);
		var song = this.props.savedTracks[i].track.uri
		var art = this.props.savedTracks[i].track.album.images[1].url
		var songName = this.props.savedTracks[i].track.name;
		this.props.setCurrentTrackName(songName);
		this.setState({
			currentTrackName: songName
		})
		console.log('songname: ', songName);
		var trackObj = {
			'uri': song
		}
		console.log('trackObj: ', trackObj)
			console.log(song);
		var artObj = {
			'url': art
		}
		this.setState({
			trackArt: art
		})
		this.props.setArt(art);
		helpers.playMusic(this.props.savedTracks, i);
	},

	// When a user submits... 
	handleClickStop: function(){
		helpers.stopMusic();

	},

	// When a user submits... 
	handleClickBack: function(){
		var self = this;
		var i = self.props.index;
		if(i > 0) {
			i--;
			self.props.setIndex(i);
			var art = self.props.savedTracks[i].track.album.images[1].url
			var songName = self.props.savedTracks[i].track.name;
			self.props.setCurrentTrackName(songName);
			self.setState({
				currentTrackName: songName
			})
			console.log('songname: ', songName);
			var artObj = {
				'url': art
			}
			self.setState({
				trackArt: art
			})
			self.props.setArt(art);
			self.handleClickPlay(i);
		}
	},

	// When a user submits... 
	handleClickForward: function(){
		var self = this;
		var i = self.props.index;
		if(i <= self.props.savedTracks.length-1) {
			i++;
			console.log('newIndex', i);
			self.props.setIndex(i);
			var art = self.props.savedTracks[i].track.album.images[1].url
			var songName = self.props.savedTracks[i].track.name;
			self.props.setCurrentTrackName(songName);
			self.setState({
				currentTrackName: songName
			})
			console.log('songname: ', songName);
			var artObj = {
				'url': art
			}
			self.setState({
				trackArt: art
			})
			self.props.setArt(art);
			self.handleClickPlay(i);
		}
	},

	// Here we render the function
	render: function(){
		var i = this.props.index;
		var self = this;

		return(

			<div className="row">
				<div className="col-md-12">
					<div className="row">
						<div className="col-md-6">
							<img src={this.props.trackArt}/>
						</div>
					</div>
						<div className='row'>
							<div className='col-md-6'>
								<p>{this.props.currentTrackName}</p>
							</div>
						</div>
				<div className="btn-group">
					<button onClick={this.handleClickPlay} className="btn btn-custom"><span title="Play" id="play" className="glyphicon glyphicon-play aligned"></span></button>
					<button onClick={this.handleClickStop} className="btn btn-custom"><span title="Stop" id="stop" className="glyphicon glyphicon-stop aligned"></span></button>
					<button onClick={this.handleClickBack} className="btn btn-custom"><span title="back" id="play" className="glyphicon glyphicon-fast-backward aligned"></span></button>
					<button onClick={this.handleClickForward} className="btn btn-custom"><span title="next" id="play" className="glyphicon glyphicon-fast-forward aligned"></span></button>		
				</div>
				</div>
			</div>

		)
	}
});

// Export the component back for use in other files
module.exports = Player;