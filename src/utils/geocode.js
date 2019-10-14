const request = require('request')

const geocode = (address, callback) => {

    const coordinatesUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibWVnejk2IiwiYSI6ImNrMW1tZHc0ZjAyNWUzb283YmY1emY2ZmMifQ.D3M7OSe5xBMkCCiF9qwvLw&limit=1`

    request({ url: coordinatesUrl, json: true }, (err, {body}) => {
        if (err) {
            callback('Unable to connect to location service !', undefined)
        }
        else if (body.features.length === 0) {
            callback('Unable to find location, Try another search', undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }

    })

}


module.exports = geocode