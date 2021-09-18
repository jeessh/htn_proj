var axios = require('axios');

const og = "16 Templehill Bay NE, Calgary, AB T1Y 4C7"; // postal code of worker
const dest = "27 Templehill Pl NE, Calgary, AB T1Y 4B8"; // postal code of recruiter

const distance = (og, dest) =>{
    var config = {
        method: 'get',
        url: 'https://maps.googleapis.com/maps/api/distancematrix/json',
        headers: { },
        params: {
            origins: og,
            destinations: dest,
            mode: 'walking',
            language: 'en-EN',
            key: 'AIzaSyAqjFMWvUEC6AfvWFu4OlVUD5SKvoByVqA'
        }
      };
    
    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data.rows[0].elements[0].distance.text));
    })
    .catch(function (error) {
        console.log(error);
    });
}

distance(og, dest); // distance between

// https://developers.google.com/maps/documentation/distance-matrix/overview#maps_http_distancematrix_latlng-js
// https://console.cloud.google.com/apis/credentials?project=poetic-primer-326404

module.exports = {distance};