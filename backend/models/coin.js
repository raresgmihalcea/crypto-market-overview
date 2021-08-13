const mongoose = require('mongoose')

const coinSchema = new mongoose.Schema ({
  _id: String,
  name: {
    type: String
  },
  current_price: {
    type: Number
  },
  market_cap: {
    type: Number
  },
  market_cap_rank: {
    type: Number
  },
  price_change_percentage_24h:{
    type: Number
  },
  historicalPrices:{
    type: [[Number]]
  },
  image:{
    type: String
  },
})

coinSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Coin', coinSchema)