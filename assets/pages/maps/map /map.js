//JS for driving to beach location
//invoking user exact location
window.onload = getMyLocation;

//This function is inokved asynchronously by the HTML5 geolocation API.
function displayLocation(position) {
  //The latitude and longitude values obtained from HTML 5 API.
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
   //Creating a new object for using latitude and longitude values with Google map.
  var latLng = new google.maps.LatLng(latitude, longitude);
   showMap(latLng);
   addNearByPlaces(latLng);
  createMarker(latLng);
   //Also setting the latitude and longitude values in another div.
  var div = document.getElementById('location');
  div.innerHTML = 'You are at Latitude: ' + latitude + ', Longitude: ' + longitude;
}
function showMap(latLng) {
    //Setting up the map options like zoom level, map type.
    var mapOptions = {
      center: latLng,
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
     //Creating the Map instance and assigning the HTML div element to render it in.
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  }
   function addNearByPlaces(latLng) {
     var nearByService = new google.maps.places.PlacesService(map);
     var request = {
      location: latLng,
      radius: 1000,
      types: ['food', 'bakery', 'cafe', 'grocery_or_supermarket', 'meal_delivery','restaurant', 'meal_takeaway', 'shopping_mall']
    };
     nearByService.nearbySearch(request, handleNearBySearchResults);
  }
   function handleNearBySearchResults(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        createMarker(place.geometry.location, place);
      }
    }
  }
