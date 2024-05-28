let ipAddress = document.getElementById("ipaddress");
let locationsuser = document.getElementById("location");
let timezone = document.getElementById("timezone");
let isp = document.getElementById("isp");
const url ='https://geo.ipify.org/api/v2/country?apiKey=at_T9nxtONsCxoLIafq3riHK9NdGiISV&ipAddress=8.8.8.8';
let myipAddress;
(async function (){
  const data = await fetch("https://api.ipify.org?format=json", {
    header: "Access-Control-Allow-Origin: *",
  });
  const response = await data;
  const result = await response.json();
  myipAddress = result.ip;
  ipAddress.textContent = myipAddress
  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_T9nxtONsCxoLIafq3riHK9NdGiISV&ipAddress=${myipAddress}`;
  const searchAddress = async function (url){
    let reponseValues ;
    try{
      const response = await fetch(url);
      const result  = await response.json();
      reponseValues = result;
      locationsuser.textContent = reponseValues.location.country;
      timezone.textContent = reponseValues.location.timezone;
      isp.textContent = reponseValues.isp;
      let lat = reponseValues.location.lat;
      let lng = reponseValues.location.lng;
      console.log(lat,lng);
      const marker = new L.marker([lat,lng], {
        title:`${reponseValues.location.country}`,
        
      });
      marker.addTo(map);
      map.panTo([lat,lng])
      
    }catch(err){
      console.log(err.message)
    }
    console.log(reponseValues)
  }
  searchAddress(url)
})()

const mapOptions = {
  center: [17.385044, 78.486671],
  zoom: 10
}
let map = new L.map("map", mapOptions);
var layer = new L.TileLayer(
  "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
);
map.addLayer(layer);

var marker = new L.marker([17.385044, 78.486671]);
marker.addTo(map);

let searchButton = document.getElementById("button");
searchButton.addEventListener("click",handleSearch);


function handleSearch(e){
  e.preventDefault();
  let inputAddress = document.getElementById("address");
  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_T9nxtONsCxoLIafq3riHK9NdGiISV&ipAddress=${inputAddress.value}`;
  ipAddress.textContent = inputAddress.value;
  inputAddress.value = " "
  searchAddress(url);
};

const searchAddress = async function (url){
  let reponseValues ;
  try{
    const response = await fetch(url);
    const result  = await response.json();
    reponseValues = result;
    locationsuser.textContent = reponseValues.location.country;
    timezone.textContent = reponseValues.location.timezone;
    isp.textContent = reponseValues.isp;
    let lat = reponseValues.location.lat;
    let lng = reponseValues.location.lng;
    console.log(lat,lng);
    const marker = new L.marker([lat,lng], {
      title:`${reponseValues.location.country}`,

    });
    marker.addTo(map);
    map.panTo([lat,lng])

  }catch(err){
    console.log(err.message)
  }
  console.log(reponseValues)
}