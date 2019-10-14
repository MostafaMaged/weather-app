const request = require('request')

const forecast = (latitude, logitude, callback) => {
    const weatherUrl = `https://api.darksky.net/forecast/56802f1db76f93042bb6fab5ec5f2a29/${latitude},${logitude}`

    request({url: weatherUrl, json: true}, (err, {body}) => {
        if(err)
        {
            callback('Unable to connect to weather service !', undefined)
        }
        else if(body.error)
        {
            callback('Unable to find location !', undefined)
        }
        else
        {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability
            })
        }
    })
}


module.exports = forecast