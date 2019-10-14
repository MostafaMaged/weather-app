const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public/')))

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Megoz'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'megz',
        job: 'software engineer',
        exp: 10,
        title: 'About Me'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'heeeeeeeeeeeeeeeeeelp!',
        name: 'megzawy',
        title: 'Help Me!'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address!'
        })
    }

    geocode(req.query.address, (err, {latitude, longitude, location} = {}) => {
        if(err) {
            return res.send({
                error: err
            })
        }

        forecast(latitude, longitude, (err, {summary, temperature, precipProbability} = {}) => {
            if(err) {
                return res.send({
                    error: err
                })
            }

            res.send({
                summary,
                temperature,
                precipProbability,
                location
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        res.send({
            error: 'You must provide search term.'
        })
    }
    else {
        console.log(req.query.search)
        res.send({
        products: []
    })
    }
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 ERROR',
        name: 'Mostafa Maged',
        errorMessage: 'Help article doesn\'t exist.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 ERROR',
        name: 'Mostafa Maged',
        errorMessage: 'page Not Found!'
    })
})

app.listen(3000, () => {
    console.log('Server is up!')
})




