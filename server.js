require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
var cors = require('cors')
const workoutRoutes = require('./routes/workouts.js')
const userRoutes = require('./routes/user.js')

const app = express()

// middleware

app.use(express.json())

app.use(cors({
    origin: '*'}))

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.get('/', (req, res) => {
    res.json({ mssg: 'Welcome to the app' })
})

app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)


// connect to db
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('connected to database')
        // listen to port
        app.listen(process.env.PORT, () => {
            console.log('listening for requests on port')
        })
    })
    .catch((err) => {
        console.log(err)
    })



