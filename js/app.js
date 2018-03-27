const inputLocation = document.querySelector("input");
const btnSearch = document.querySelector("button");


btnSearch.addEventListener("click",getPlace);
$('#reset-btn').click(resetValues);


function getPlace(){
  let city = inputLocation.value.toLowerCase();
  console.log(city);
  let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + city + '&key=AIzaSyASipcFbUQ-EPHlwc4zHazQKcJ443uTp5I';

   fetch(url)
       .then(response => response.json())
       .then(data => {
          console.log(data);
           const lat = data.results[0].geometry.location.lat;
           const lng = data.results[0].geometry.location.lng;
           todayWeather(lat,lng);
       })

       .catch( e => {console.log(e); console.log( 'Something went wrong' ) });

}

function todayWeather(lat, lng) {

  $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/dbe165170a9d3843d322e095bd74e1ba/' + lat + ',' + lng
    }).done(function(data) {
      console.log(data);
      displayValues(data);
    })
    .fail(function(error) {
      console.log(error);
    });

}

function displayValues(data) {
  var current = data.currently;
  var temp = ((current.temperature-32)*5)/9;
  var apparentTemp = ((current.apparentTemperature-32)*5)/9;
  var date = new Date(current.time*1000);

  $('#temp').text(temp.toFixed(0));
  $('#apparentTemp').text(apparentTemp.toFixed(0));
  $('#summary').text(current.summary);
  $('#time').text(date);

  $('#w-forecast').show();
  $('#background').hide();
}

function resetValues() {
  $('#w-input').val('');
  $('#w-forecast').hide();
  $('#background').show();
}

function runScript(e) {
    if (e.keyCode == 13) {
        getPlace();
        return false;
    }
}
