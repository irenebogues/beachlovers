/**
 * 	Javascript file for proj1_userSelection.js
 * 	Author: Jonathan Garcia
 * 	First Created 11/13/2018
 * 	Last Modified 12/02/2018 
 */

// $(document).ready(function(){
	console.log('proj1_userSelection.js LOADED\n----------');
	
	
	// // Initialize Firebase - This Database was used for test purposes
	// var config = {
	// 	apiKey: 			"AIzaSyASGSOPwe4CpZSRdA5IbOtR6t5KpHIXIvU",
	// 	authDomain: 		"cal-access-locations.firebaseapp.com",
	// 	databaseURL: 		"https://cal-access-locations.firebaseio.com",
	// 	projectId: 			"cal-access-locations",
	// 	storageBucket: 		"cal-access-locations.appspot.com",
	// 	messagingSenderId: 	"145373739846"
	//   };
	  
	//   firebase.initializeApp(config);

	//   var database = firebase.database();		// Variable to interact with Firebase

	/**
	 * 	OBJECT
	 * 	Hold the user choices of either Yes/No
	 * 	Contains five properties
	 * 	Each key in this object shares the same key name
	 * 	as the coastal API
	 */
	
	// Default set to no in case user leaves a choice blank
	var objChoices = {
		BIKE_PATH: "",
		DOG_FRIENDLY: "",
		PARKING: "",
		RESTROOMS: "",
		VOLLEYBALL: ""
	}
	
	/**
	 * 	VARIABLES
	 * 	These five variables hold the answers to each choice the user selected
	 * 	Each variable is used inside the change event listener
	 */
	
	var tmp = [];
	var final = [];

		// LISTENER - CHANGE EVENT LISTENER
		$('.form-group').on('change', function(){
			// event.preventDefault();

			objChoices.BIKE_PATH = $('#option1').val();		// Hold answer to option1	
			objChoices.DOG_FRIENDLY	= $('#option2').val();		// Hold answer to option2
			objChoices.PARKING = $('#option3').val();		// Hold answer to option3
			objChoices.RESTROOMS = $('#option4').val();		// Hold answer to option4
			objChoices.VOLLEYBALL = $('#option5').val();		// Hold answer to option5
			
			// console.log(objChoices);				// See object contents
			// step2(objChoices);
			
		}); // END OF EVENT LISTENER - CHANGE

		// LISTENER - SUBMIT BUTTON LISTENER
		$('.btn-primary').on('click', function(event)
		{
			event.preventDefault();
			// step2(bike, dog, parking, restrooms, volleyball);
			step2(objChoices.BIKE_PATH, 
				objChoices.DOG_FRIENDLY, 
				objChoices.PARKING, 
				objChoices.RESTROOMS, 
				objChoices.VOLLEYBALL);
		}); // END OF EVENT LISTENER - SUBMIT BUTTON
	
		// step2(bike, dog, parking, restrooms, volleyball);
		function step2(arg1,arg2,arg3,arg4,arg5) {
			
			$('.question-area').hide();	// Hide the choices

			var queryURL = "https://api.coastal.ca.gov/access/v1/locations";

			$.ajax({
				url: queryURL,
				method: "GET"
			})
			.then(function (response) {
				// console.log(response);
				
				// Find matching results in api call and set into array
				for (let i = 0; i < response.length; i++) {
					
					if( (response[i].BIKE_PATH === arg1)){
						tmp.push(response[i]);
					}

					if( (response[i].DOG_FRIENDLY === arg2)){
						tmp.push(response[i]);
					}

					if( (response[i].PARKING === arg3)){
						tmp.push(response[i]);
					}

					if( (response[i].RESTROOMS === arg4)){
						tmp.push(response[i]);
					}

					if( (response[i].VOLLEYBALL === arg5)){
						tmp.push(response[i]);
					}
				}// end of for-loop
				
				console.log(tmp); // See unfiltered results
				
				// populate the final array with duplicates removed
				final = removeDuplicates(tmp);
				
				console.log(final); // See filtered results with duplicates removed
				
				// Populate webpage with filtered results
				for (let index = 0; index < 30; index++) 
            	{
                    // Elements
                    var newDiv          = $('<div class="card">');           
                    var innerDiv        = $('<div class="card-body">');    
                    var newHeading      = $('<h4>');
                        newHeading.text(final[index].NameMobileWeb);
                    var newParagraph    = $('<p>');
                        newParagraph.text(final[index].DescriptionMobileWeb);
                    var imageDiv        = $('<img class="card-img-top">');
                        imageDiv.attr('src', final[index].Photo_1);
					var goButton        = $('<a class="btn btn-primary" role="button" >');
						// Add Latitude and Longitude to each Lets Go Button
						goButton.attr('data-location', (final[index].LATITUDE + "," + final[index].LONGITUDE));
						// Add href to google maps? -- Example : //https://www.google.com/maps/place/41.992854,-124.208809
						goButton.attr('href', "https://www.google.com/maps/place/" + (final[index].LATITUDE + "," + final[index].LONGITUDE));
						
					var cleanBtn        = $('<a class="btn btn-success" role="button">');
						// Add clean up webpage to each Clean Up Info Button
						cleanBtn.attr('href', "http://www.ebparks.org/about/getinvolved/volunteer/events");
                    // Add text to buttons
                    goButton.text("Let's Go");
                    cleanBtn.text("CleanUp Info");

                    // Build the inner div
                    innerDiv.append(newHeading);
                    innerDiv.append(newParagraph);
                    innerDiv.append(goButton);
                    innerDiv.append(cleanBtn);
                    innerDiv.prepend(imageDiv);
                    
                    // Append to outer div & add image
                    // newDiv.append(innerDiv);
                    // imageDiv.attr('src', final[index].Photo_1);

                    // newHeading.text(final[index].NameMobileWeb);
                    // newParagraph.text(final[index].DescriptionMobileWeb);
                    // Add to the card-group div
                    newDiv.append(innerDiv);
                    $('.row').append(newDiv);

                    // Add the image to each card
                    // $('.card-body').before(imageDiv);
                    // Add the href to each go button
                    // goButton.attr('href', 'http://www.ebparks.org');
				} // end of for loop
				
				$(".btn-success").attr("href" , argument)
				  
			}); // end of ajax call
		}

		function removeDuplicates(list) {
			var result = [];
			$.each(list, function(i, e) {
			  if ($.inArray(e, result) == -1) result.push(e);
			});
			return result;
		}


 }); // END OF FILE