// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require('axios');

// Helper Functions
var helpers = {

	// This function retrieves the current user's saved tracks from Spotify. 
	getSavedTracks: function(){
		return axios.get('/tracks')
		.then(function(response){
			// console.log(response);
			return response;
		})
		console.log('getSavedTracks Fired');

	},

	getTopTracks: function(){
		return axios.get('/favoriteTracks')
		.then(function(response){
			// console.log(response);
			return response;
		})
		console.log('getTopTracks Fired');

	},

	getNewTracks: function(){
		return axios.get('/newTracks')
		.then(function(response){
			// console.log(response);
			return response;
		})
		console.log('getNewTracks Fired');

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

	stopMusic: function(track){

		console.log('Stopping track');

		return axios.post('/stop')
			.then(function(response){
				console.log(response);
		})

	},


}


// We export the helpers function 
module.exports = helpers;