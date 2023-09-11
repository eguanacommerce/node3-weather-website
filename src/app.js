const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sonia Park'
    })
})

app.get('/weather', (req, res) => {
    // const address = req.query.address
    if (!req.query.address) {
        return res.send({
            error: 'You need to provide address.'
        })
    }

    forecast(req.query.address, (error, summary, location) => {
        if (error) {
            return res.send({
                error
            })
        }
        // console.log(data)
        res.send({
            forecast: summary,
            location: location,
            address: req.query.address
        })
    })

    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })

    // res.render('index', {
    //     title: 'Weather',
    //     name: 'Sonia Park'
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term.'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Sonia Park' 
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Sonia Park',
        message: 'This is a help message'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Sonia Park',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Sonia Park',
        errorMessage: 'Page not found.'
    })
})

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Andrew',
//         age: 27
//         },
//         {
//             name: 'Andrew',
//             age: 27
//         }])
//     })
// automatically convert object to JSON
// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

// app.get('/weather', (req, res) => {
//     res.send({
//         location: 'Seoul',
//         forecast: 'It is snowing.'
//     })
// })

//start the server up
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
