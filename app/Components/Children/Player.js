// Include React 
var React = require('react');
var helpers = require('../utils/helpers.js');

// This is the player component. 
var Player = React.createClass({

	
	// Here we set a generic state associated with the text being searched for
	getInitialState: function(){
		return {
			track: ""
		}
	},

	// This function will respond to the user input 
	handleChange: function(event){

    	// Here we create syntax to capture any change in text to the query terms (pre-search).
    	// See this Stack Overflow answer for more details: 
    	// http://stackoverflow.com/questions/21029999/react-js-identifying-different-inputs-with-one-onchange-handler
    	var newState = {};
    	newState[event.target.id] = event.target.value;
    	this.setState(newState);

	},

	// When a user submits... 
	handleClickPlay: function(){
		var track = [{
			  uri: 'spotify:track:4beeB45WycRGaqXbCiJsLN'
			},
			{uri: 'spotify:track:6ZIT7Isugjflmm3TDIkgji'},
			{uri: 'spotify:track:1VOjrMklQs25X93vgjJuGO'},
			{uri: 'spotify:track:2U2lREJtuQipwd8W69lgOm'}
		]

		helpers.playMusic(track[0]);
	},

	// When a user submits... 
	handleClickStop: function(){
		helpers.pauseMusic();

	},

	// When a user submits... 
	handleClickBack: function(){
		var track = [{
			  uri: 'spotify:track:4beeB45WycRGaqXbCiJsLN'
			},
			{uri: 'spotify:track:6ZIT7Isugjflmm3TDIkgji'},
			{uri: 'spotify:track:1VOjrMklQs25X93vgjJuGO'},
			{uri: 'spotify:track:2U2lREJtuQipwd8W69lgOm'}
		]

		for (var i = 0; i<track.length; i--) {
			helpers.playMusic(track[i])
		}

	},

	// When a user submits... 
	handleClickForward: function(){
		var track = [{
			  uri: 'spotify:track:4beeB45WycRGaqXbCiJsLN'
			},
			{uri: 'spotify:track:6ZIT7Isugjflmm3TDIkgji'},
			{uri: 'spotify:track:1VOjrMklQs25X93vgjJuGO'},
			{uri: 'spotify:track:2U2lREJtuQipwd8W69lgOm'}
		]
	},

	// Here we render the function
	render: function(){

		return(

			<div className="row">
				<div className="btn-group">
					<button onClick={this.handleClickPlay} className="btn btn-custom"><span title="Play" id="play" className="glyphicon glyphicon-play aligned"></span></button>
					<button onClick={this.handleClickStop} className="btn btn-custom"><span title="Stop" id="stop" className="glyphicon glyphicon-stop aligned"></span></button>
					<button onClick={this.handleClickBack} className="btn btn-custom"><span title="back" id="play" className="glyphicon glyphicon-fast-backward aligned"></span></button>
					<button onClick={this.handleClickForward} className="btn btn-custom"><span title="next" id="play" className="glyphicon glyphicon-fast-forward aligned"></span></button>		
				</div>
			</div>

		)
	}
});

// Export the component back for use in other files
module.exports = Player;