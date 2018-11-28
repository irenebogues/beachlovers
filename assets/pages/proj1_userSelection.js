/**
 * 	Javascript file for proj1_userSelection.js
 * 	Author: Jonathan Garcia
 * 	First Created 11/13/2018
 * 	Last Modified 11/20/2018 
 */

$(document).ready(function(){
	
	// Initialize Firebase - This Database was used for test purposes
	var config = {
		apiKey: 			"AIzaSyASGSOPwe4CpZSRdA5IbOtR6t5KpHIXIvU",
		authDomain: 		"cal-access-locations.firebaseapp.com",
		databaseURL: 		"https://cal-access-locations.firebaseio.com",
		projectId: 			"cal-access-locations",
		storageBucket: 		"cal-access-locations.appspot.com",
		messagingSenderId: 	"145373739846"
	  };
	  
	  firebase.initializeApp(config);

	  var database = firebase.database();		// Variable to interact with Firebase

	/**
	 * 	OBJECT
	 * 	Hold the user choices of either Yes/No
	 * 	Contains five properties
	 * 	Each key in this object shares the same key name
	 * 	as the coastal API
	 */
	
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

	// LISTENER - CHANGE EVENT LISTENER
	$('.form-group').on('change', function()
	{

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
		
		console.log(objChoices);				// See object contents

	}); // END OF EVENT LISTENER - CHANGE

	// LISTENER - SUBMIT BUTTON LISTENER
	$('.btn-primary').on('click', function()
	{

		// Send the data in the object to firebase
		
		// TODO: Bring user to page where they see their results

		database.ref().push(objChoices);		// push contents of objChoices to Firebase
		// Tested - this works

	}); // END OF EVENT LISTENER - SUBMIT BUTTON
	
});