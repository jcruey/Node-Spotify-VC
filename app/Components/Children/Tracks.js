// Include React 
var React = require('react');

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
				<tr>	
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>	
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>	
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>	
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
			</tbody>
			</table>


		)
	}
});

// Export the component back for use in other files
module.exports = Tracks;