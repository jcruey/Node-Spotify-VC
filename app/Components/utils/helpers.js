// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require('axios');

// Helper Functions (in this case the only one is runQuery)
var helpers = {

	// This function serves our purpose of running the query to geolocate. 
	runQuery: function(){
		axios.get('/tracks')
		.then(function(response){
			console.log(response);
		})
		console.log('RunQuery Fired');

	},

	playMusic: function(track){

		console.log('Playing track');

		return axios.post('/play', track)
			.then(function(response){
				console.log(response);
		})

	},

	pauseMusic: function(track){

		console.log('Pausing track');

		return axios.post('/pause')
			.then(function(response){
				console.log(response);
		})

	},


}


// We export the helpers function 
module.exports = helpers;