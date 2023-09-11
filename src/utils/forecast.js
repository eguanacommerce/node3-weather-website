const request = require('request')

const forecast = (location, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=faa1c0a4b68b6fb8c1bd499ce4f7b4a4&query=' + location

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined, undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined, undefined)
        } else {
            // callback(undefined, body)
            //  callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
            callback(undefined,
                body.current.weather_descriptions + ' It is currently ' + body.current.temperature + ' degrees out. There is a ' + body.current.precip + '% chance of rain.',
                body.location.timezone_id
            )
        }
    })
}

module.exports = forecast