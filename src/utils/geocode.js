const request = require('request');

const geocode = (location, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoidmlzaGFsdmFzaXNoYXQiLCJhIjoiY2tmNDk4aHNvMDRpNTJ6cnZsdWVsb2JwbCJ9.0WlKv5e8DKhyP3jJMTpJVg`;

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location API', undefined);
        } else if(body.features.length === 0) {
            callback('Unable to find the location, try another search', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;