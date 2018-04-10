const request = require('request');

module.exports.geocodeAddress = (inputAddress, callback) => {
    var encodedAddress = encodeURIComponent(inputAddress);
    request({
        url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAXoS1eW90dFaCKSbzIgW_XYshsS9gWSeE`,
        json: true
    }, (err, res, body) => {
        if(err){
            callback("Unable to connect to Google Servers. Try Again Later.");
        } else if(body.status === "ZERO_RESULTS"){
            callback("That was an invalid entry. Try Again.");
        } else if(body.results[0].address_components[0].types[0] === "country"){
            callback("Can't fetch results for the type 'Country'. Try Again.");
        } else if(body.status === "OK"){
            callback(undefined, {
                Address: body.results[0].formatted_address,
                Latitude: body.results[0].geometry.location.lat,
                Longitude: body.results[0].geometry.location.lng
            });
        }
    });
};

module.exports.getAllDetails = (lat, long, callback) => {
    request({
        url: `https://api.darksky.net/forecast/fcccd3131bf7fb558373edef0c1e65ce/${lat},${long}`,
        json: true
    }, (err, res, body) => {
        if(err){
            callback("Unable to connect to Google Servers.");
        } else {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature,
                summary: body.currently.summary,
                humidity: body.currently.humidity,
                precipIntensity: body.currently.precipIntensity,
                windSpeed: body.currently.windSpeed
            });
        }
    });
};