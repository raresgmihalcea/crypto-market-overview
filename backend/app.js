
require('express-async-errors')
const cors = require('cors')
const path = require('path');
const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const schedule = require('node-schedule');
const coinsRouter = require('./routers/coins')
const handleCoinData = require('./controllers/handleCoinData')

const app = express()

mongoose.connect(process.env.MONGODB_URI || config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use('/api/coins', coinsRouter)
// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/build/index.html'));
});

// Update coin data every minute
const job_UpdateCoinData = schedule.scheduleJob('30 * * * * *', () => {
  handleCoinData.updateCoins()
  console.log('Data Updated')
})
//Update historical data every day at 14:00
const job_UpdateHistoricalData = schedule.scheduleJob('0 0 14 * * *', () => {
  handleCoinData.updateHistoricalData()
  //console.log('Historical Data Updated')
})
console.log(handleCoinData.baseURL)
module.exports = app