const inputLocation = document.querySelector("input");
const btnSearch = document.querySelector("button");


inputLocation.addEventListener("keyup",searchLocation);
btnSearch.addEventListener("click",getPlace);

function searchLocation (){
  let city = inputLocation.value.toLowerCase();
}

function getPlace(){
let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyDCNqBEzPh4G-q_KdqMaXDcgrKeF0A2uE4`;

   fetch(url)
       .then(response => response.json())
       .then(data => {
           const lat = data.results[0].geometry.location.lat;
           const lng = data.results[0].geometry.location.lng;
           todayWeather(lat,lng)
              console.log(url);
       })

       .catch( e => console.log( 'Something went wrong' ) );
}
