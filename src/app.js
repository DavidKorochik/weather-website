const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(app);

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'David Korochik'
    });
});



app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'David Korochik'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'David Korochik',
        msg: 'This is a help message'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address term'
        });
    }
    geocode(req.query.address, (err, {latitude, longitude, location} = {}) => {
        if(err) {
            return res.send({error: err});
        }
        forecast(latitude, longitude, (err, forecastData) => {
            if(err) {
                return res.send({error: err});
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
}); 

app.get('/help/*', (req, res) => {
    res.render('error', {
        msg: 'Help article not found',
        name: 'David Korochik',
        title: '404'
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        msg: 'Page not found',
        name: 'David Korochik',
        title: '404'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});