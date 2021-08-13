const mongoose = require('mongoose')

const historicalDataSchema = new mongoose.Schema ({
  _id: String,
  name: {
    type: String
  },
  prices:{
    type: [[Number]]
  }
})

historicalDataSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('historicalData', historicalDataSchema)