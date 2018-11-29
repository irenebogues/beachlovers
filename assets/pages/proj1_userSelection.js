/**
 * 	Javascript file for proj1_userSelection.js
 * 	Author: Jonathan Garcia
 * 	First Created 11/13/2018
 * 	Last Modified 11/20/2018 
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
	
	var bike, dog, parking, restrooms, volleyball;
	var tmp = [];
	var final = [];

		// LISTENER - CHANGE EVENT LISTENER
		$('.form-group').on('change', function(){
			// event.preventDefault();

			bike 		= $('#option1').val();		// Hold answer to option1	
			dog 		= $('#option2').val();		// Hold answer to option2
			parking 	= $('#option3').val();		// Hold answer to option3
			restrooms 	= $('#option4').val();		// Hold answer to option4
			volleyball 	= $('#option5').val();		// Hold answer to option5

			objChoices.BIKE_PATH 	= bike;			// Set bike answer into Obj
			objChoices.DOG_FRIENDLY = dog;			// Set dog answer into Obj
			objChoices.PARKING 		= parking;		// Set parking answer into Obj
			objChoices.RESTROOMS 	= restrooms;	// Set restrooms answer into Obj
			objChoices.VOLLEYBALL 	= volleyball;	// Set volleyball answer into Obj
			
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
				
				console.log(tmp);
				
				// populate the final array with duplicates removed
				final = removeDuplicates(tmp);
				

				// console.log('--------------------');
				// console.log(final);
				
				// Populate webpage with filtered results
				for (let index = 0; index < 9; index++) 
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
                    var cleanBtn        = $('<a class="btn btn-success" role="button">');
                    
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
                    $('.results').append(newDiv);

                    // Add the image to each card
                    // $('.card-body').before(imageDiv);
                    // Add the href to each go button
                    // goButton.attr('href', 'http://www.ebparks.org');
            	} // end of for loop
				  
			}); // end of ajax call
		}

		function removeDuplicates(list) {
			var result = [];
			$.each(list, function(i, e) {
			  if ($.inArray(e, result) == -1) result.push(e);
			});
			return result;
		  }

// }); // END OF FILE