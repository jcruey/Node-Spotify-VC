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
		// helpers.runQuery().then(function(data) {
			// console.log('Data: ' + data);
		// })
		return {
			searchTerm: "",
			results: ""
		}
	},	

	// This function allows childrens to update the parent.
	setTerm: function(term){
		this.setState({
			searchTerm: term
		})
	},

	// If the component changes (i.e. if a search is entered)... 
	// componentDidUpdate: function(prevProps, prevState){

	// 	if(prevState.searchTerm != this.state.searchTerm){
	// 		console.log("UPDATED");

	// 		var self = this;
	// 		// Run the query for the address
	// 		helpers.runQuery(location)
	// 			.then(function(data){
	// 				if (data != self.state.results)
	// 				{
	// 					console.log("Address", data);

	// 					self.setState({
	// 						results: data
	// 					})
	// 				}
	// 			});
	// 		}
	// },

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
					            <li className="active"><a href="#">Home</a></li>
					            <li><a href="#">Playlists</a></li>
					            <li><a href="#">New Tracks</a></li>
					            <li><a href="#">Favorite Tracks</a></li>
					            <li><a href="/auth/spotify">Sign In</a></li>
					        </ul>
					    </div>    
					</nav>
					{/*-- End Navigation --*/}

				</div>

				<div className="row">

					<div className="col-md-6">
					
						<Player setTerm={this.setTerm} />

					</div>

					<div className="col-md-6">
						<p>Voice Control: Use your voice to control the Spotify player. You can say things like Play Jan Blomqvist.</p>
					</div>

				</div>

				<div className="row">
					<div className="col-md-12">
				
						<Tracks address={this.state.tracks} />

					</div>
				</div>

			</div>
		)
	}
});

// Export the component back for use in other files
module.exports = Main;