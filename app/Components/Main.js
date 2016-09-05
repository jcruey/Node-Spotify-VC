// Include React 
var React = require('react');

// Here we include all of the sub-components
var Player = require('./Children/Player');
var Tracks = require('./Children/Tracks');

// Helper Function
var helpers = require('./utils/helpers.js');

// This is the main component. 
var Main = React.createClass({

	// Here we set a generic state associated with the number of clicks
	getInitialState: function(){
		
		return {
			savedTracks: "",
			topTracks: "",
			trackArt: "",
			index: 0
		}
	},	

	// This function allows childrens to update the parent.
	setIndex: function(index){
		this.setState({
			index: index
		})
	},

	setArt: function(trackArt){
		this.setState({
			trackArt: [trackArt]
		})
	},

	componentDidMount: function() {
		helpers.getSavedTracks()
		.then(function(response) {
			this.setState({savedTracks: response.data})
		}.bind(this))
	},


	// Here we render the function
	render: function(){

		return(

			<div className="container">

				<div className="row">
					<nav className="navbar" role="navigation">
					    <div className="navbar-header navbar-default navbar-right">
					        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
					            <span className="sr-only">Toggle navigation</span>
					            <span className="icon-bar"></span>
					            <span className="icon-bar"></span>
					            <span className="icon-bar"></span>
					        </button>
					    </div> 
					    <div className="navbar-collapse collapse">
					        <ul className="nav navbar-nav navbar-nav navbar-right">
					            <li className="active"><a href="/home">Home</a></li>
					            <li><a href="#">Playlists</a></li>
					            <li><a href="/newTracks">New Tracks</a></li>
					            <li><a href="/favoriteTracks">Favorite Tracks</a></li>
					            <li><a href="/account">Account</a></li>
					        </ul>
					    </div>    
					</nav>
					{/*-- End Navigation --*/}

				</div>

				<div className="row">

					<div className="col-md-6">
					
						<Player 
						savedTracks={this.state.savedTracks} setIndex={this.setIndex} 
							index={this.state.index} trackArt={this.state.trackArt} setArt={this.setArt} />


					</div>

					<div className="col-md-6">
						<p>Voice Control: Use your voice to control the Spotify player. You can say things like Play Jan Blomqvist.</p>
					</div>

				</div>

				<div className="row">
					<div className="col-md-12">
				
						<Tracks savedTracks={this.state.savedTracks} setIndex={this.setIndex} 
							index={this.state.index} trackArt={this.state.trackArt} setArt={this.setArt} />

					</div>
				</div>

			</div>
		)
	}
});

// Export the component back for use in other files
module.exports = Main;