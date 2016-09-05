// Include React 
var React = require('react');
var helpers = require('../utils/helpers.js');

// This is the player component. 
var Player = React.createClass({

	
	// Here we set a generic state associated with the text being searched for
	getInitialState: function() {
		return {
			savedTracks: "",
			index: 0
		}
	},

	// When a user submits... 
	handleClickPlay: function(i){
		var i = this.props.index
		console.log(i);
		var song = this.props.savedTracks[i].track.uri
		var trackObj = {
			'uri': song
		}
		console.log('trackObj: ', trackObj)
			console.log(song);
		helpers.playMusic(trackObj);
	},

	// When a user submits... 
	handleClickStop: function(){
		helpers.pauseMusic();

	},

	// When a user submits... 
	handleClickBack: function(){
		var i = this.props.index - 1;
		this.props.setIndex(i);
		this.handleClickPlay(i);
	},

	// When a user submits... 
	handleClickForward: function(){
		var i = this.props.index + 1;
		this.props.setIndex(i);
		this.handleClickPlay(i);
	},

	// Here we render the function
	render: function(){
		var i = this.props.index;
		var trackArt = this.props.savedTracks[i];
		console.log(trackArt);
		var self = this;

		return(

			<div className="row">
				<div className="col-md-12">
					<div className="row">
					<div className="col-md-6">
					{/*<img src={self.savedTracks}/>*/}
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