/**
 * Javascript file for proj1_pg3.html
 * Author: jonathan garcia
 */

$(document).ready(function(){

	var queryURL = "https://api.coastal.ca.gov/access/v1/locations";


	$.ajax({
		url: queryURL,
		method: "GET"
	})
	.then(function(response){
		console.log(response);

		var newAttr = "";
		var beach1 = response[0].Photo_1;  //[4].Photo_1
		var beach2 = response[1].Photo_1;  //[4].Photo_1
		var beach3 = response[2].Photo_1;  //[4].Photo_1

		$('#card1').attr("src", beach1);
		$('#card2').attr("src", beach2);
		$('#card3').attr("src", beach3);

		// Beach names here
		$('#beach-1').text(response[0].NameMobileWeb + ": ");
		$('#beach-2').text(response[1].NameMobileWeb + ": ");
		$('#beach-3').text(response[2].NameMobileWeb + ": ");

		// Beach amenities
		// [""0""].BIKE_PATH
		$('#ct-1').text('Bike Friendly: '+ response[0].BIKE_PATH);
		$('#ct-2').text('Bike Friendly: '+ response[1].BIKE_PATH);
		$('#ct-3').text('Bike Friendly: '+ response[2].BIKE_PATH);

		$('#ct-1').append('<p> Sand Dunes: ' + response[0].DUNES + '</p>');
		$('#ct-2').append('<p> Sand Dunes: ' + response[1].DUNES + '</p>');
		$('#ct-3').append('<p> Sand Dunes: ' + response[2].DUNES + '</p>');

		$('#ct-1').append('<p> Parking: ' + response[0].PARKING + '</p>');
		$('#ct-2').append('<p> Parking: ' + response[1].PARKING + '</p>');
		$('#ct-3').append('<p> Parking: ' + response[2].PARKING + '</p>');

		$('#card1').prepend('<img class=card-img-top src=' + beach1 + ' style="width:286px; height: 180px; display: block;"' +'>');
		$('#card2').prepend('<img class=card-img-top src=' + beach2 + ' style="width:286px; height: 180px; display: block;"' +'>');
		$('#card3').prepend('<img class=card-img-top src=' + beach3 + ' style="width:286px; height: 180px; display: block;"' +'>');
		
		$('.beach-4-name').text(response[4].NameMobileWeb);
		$('.beach-4-text').append('<p> Bike Friendly: '+ response[4].BIKE_PATH + '</p>');
		$('.beach-4-text').append('<p> Sand Dunes: '+ response[4].DUNES + '</p>');
		$('.beach-4-text').append('<p> Parking: '+ response[4].PARKING + '</p>');


		// [""0""].PARKING
		// [4].Photo_1

	})
});