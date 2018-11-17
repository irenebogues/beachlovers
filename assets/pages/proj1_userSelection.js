/**
 * Javascript file for proj1_userSelection.js
 * author: jonathan
 */

$(document).ready(function(){

	var queryURL = "https://api.coastal.ca.gov/access/v1/locations";



	$.ajax({
		url: queryURL,
		method: "GET"
	})
	.then(function(response){
		console.log(response);

		// Beach names here
		$('#beach-1').text(response[0].NameMobileWeb + ": ");
		$('#beach-2').text(response[1].NameMobileWeb + ": ");
		$('#beach-3').text(response[2].NameMobileWeb + ": ");

		// Beach amenities
		// [""0""].BIKE_PATH -- sample API path
		$('#ct-1').text('Bike Friendly: '+ response[0].BIKE_PATH);
		$('#ct-2').text('Bike Friendly: '+ response[1].BIKE_PATH);
		$('#ct-3').text('Bike Friendly: '+ response[2].BIKE_PATH);

		$('#ct-1').append('<p> Sand Dunes: ' + response[0].DUNES + '</p>');
		$('#ct-2').append('<p> Sand Dunes: ' + response[1].DUNES + '</p>');
		$('#ct-3').append('<p> Sand Dunes: ' + response[2].DUNES + '</p>');

		$('#ct-1').append('<p> Parking: ' + response[0].PARKING + '</p>');
		$('#ct-2').append('<p> Parking: ' + response[1].PARKING + '</p>');
		$('#ct-3').append('<p> Parking: ' + response[2].PARKING + '</p>');


		// [""0""].PARKING -- Template to API path.
	})
});