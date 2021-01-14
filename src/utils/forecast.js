const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fb7c1e749d21d973088858562679034d&query=' + latitude + ',' + longitude + '&units=m';
    request({url, json: true}, (err, {body}) => { 
        if(err) {
            callback('Unable to connect weather lcoation', undefined);
        } else if(body.error) {
            callback('Unable to find your search. Try searching again', undefined);
        } else {
            console.log();
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out and it feels like ' + body.current.feelslike + ' degrees out and the humidity is ' + body.current.humidity);
        }
    });
};

module.exports = forecast;