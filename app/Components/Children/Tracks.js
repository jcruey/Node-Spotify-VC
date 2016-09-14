// Include React 
var React = require('react');
var helpers = require('../utils/helpers.js')

// This is the results component
var Tracks = React.createClass({

	getInitialState: function() {
		return {
			savedTracks: "",
			currentTrackName: "",
			index: ""
		}
	},

	// When a user submits... 
	handleClickPlay: function(i){
		// this.state.savedTracks[i + 1].track.uri
		console.log(i);
		this.setState({index: i});
		this.props.setIndex(i);
		var song = this.props.savedTracks[i].track.uri;
		var trackObj = {
			'uri': song
		}
		console.log('song: ', song);
		var art = this.props.savedTracks[i].track.album.images[1].url;
		var songName = this.props.savedTracks[i].track.name;
		this.props.setCurrentTrackName(songName);
		this.setState({
			currentTrackName: songName
		})
		console.log('songname: ', songName);
		var artObj = {
			'url': art
		}
		this.setState({
			trackArt: art
		})
		this.props.setArt(art);	
		helpers.playMusic(this.props.savedTracks, i);
	},

	// Here we render the function
	render: function(){
		var savedTracks = this.props.savedTracks || [];
		// console.log(savedTracks);
		var self = this;
		function msToMinSeconds(ms) {
	      var minutes = Math.floor(ms / 60000);
	      var seconds = ((ms % 60000) / 1000).toFixed(0);
	      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
		return(

			<table className="table">
			<thead>	
				<tr>
			    	<th></th>
				    <th>Track</th> 
				    <th>Album</th>
				    <th>Artist</th>
				    <th>Duration</th>
				</tr>
			</thead>
				{savedTracks.map(function(track, i) {
					return <tbody key={i}><tr><td><button onClick={() => this.handleClickPlay(i)} data-index={i} data-track={track.track.uri} className="btn btn-custom"><span title="Play" data-track={track.track.uri} className="play glyphicon glyphicon-play aligned"></span></button></td> <td>{track.track.name}</td> <td>{track.track.album.name}</td><td>{track.track.artists[0].name}</td><td>{msToMinSeconds(track.track.duration_ms)}</td></tr></tbody> 
				}.bind(this))}
			</table>


		)
	}
});

// Export the component back for use in other files
module.exports = Tracks;