// Include React 
var React = require('react');
var helpers = require('../utils/helpers.js')

// This is the results component
var Tracks = React.createClass({

	// Here we render the function
	render: function(){

		return(

			<table className="table">
			<thead>	
				<tr>
			    	<th>#</th>
				    <th>Track</th> 
				    <th>Album</th>
				    <th>Artist</th>
				</tr>
			</thead>
			<tbody>
				
			</tbody>
			</table>


		)
	}
});

// Export the component back for use in other files
module.exports = Tracks;