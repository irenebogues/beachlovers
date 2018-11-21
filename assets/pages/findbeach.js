var fee;
var bike;
var dunes;
var parking;
var wheelChair;
var dog;
var restroom;
dgdgdghffhfhfhdg
$(document).on("click", "#sbt1", function(){
    event.preventDefault();
    var queryURL = "https://api.coastal.ca.gov/access/v1/locations";

    $.ajax({
    url: queryURL,
    method: "GET"
    })
    .then(function(response) {
        console.log(response);
        fee = $('#fee').val();
        bike = $('#bike').val();
        dunes = $('#dunes').val();
        parking = $('#parking').val();
        wheelChair = $('#chair').val();
        dog = $('#dog').val();
        restroom = $('#restroom').val();
        console.log(fee);
    });
});