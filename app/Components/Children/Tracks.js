// Include React 
var React = require('react');
var helpers = require('../utils/helpers.js')

// This is the results component
var Tracks = React.createClass({

	getInitialState: function() {
		return {
			savedTracks: ""
		}
	},

	componentDidMount: function() {
		helpers.runQuery()
		.then(function(response) {
			this.setState({savedTracks: response.data})
			// console.log(this.state.savedTracks);
		}.bind(this))
	},

	// When a user submits... 
	handleClickPlay: function(err, b){
		var track = b.target.getAttribute('data-track');
		var trackObj = {
			'uri': track
		}
		console.log(trackObj)
		helpers.playMusic(trackObj);
	},

	// Here we render the function
	render: function(){
		var savedTracks = this.state.savedTracks || [];
		console.log(savedTracks);
		var self = this;
		return(

			<table className="table">
			<thead>	
				<tr>
			    	<th></th>
				    <th>Track</th> 
				    <th>Album</th>
				    <th>Artist</th>
				</tr>
			</thead>
				{savedTracks.map(function(track, i) {
					return <tbody key={i}><tr><td><button onClick={self.handleClickPlay.bind(null, track.track.uri)} data-track={track.track.uri} className="btn btn-custom"><span title="Play" data-track={track.track.uri} className="play glyphicon glyphicon-play aligned"></span></button></td> <td>{track.track.name}</td> <td>{track.track.album.name}</td><td>{track.track.artists[0].name}</td></tr></tbody> 
				})}
			</table>


		)
	}
});

// Export the component back for use in other files
module.exports = Tracks;