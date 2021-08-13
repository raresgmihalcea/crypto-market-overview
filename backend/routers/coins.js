const coinsRouter = require('express').Router()
const Coin = require('../models/coin')
require('express-async-errors')

coinsRouter.get('/', async (request, response) => {
  data = await Coin.find({})
  response.json(data)
})

coinsRouter.get('/:id', async (request, response) => {
  const coin = await Coin.findById(request.params.id)
  response.json(coin)
})

coinsRouter.post('/', async (request, response) => {
  const body = request.body
  const coin = new Coin({
    _id: body.id,
    name: body.name,
    current_price: body.current_price,
    market_cap: body.market_cap,
    market_cap_rank: body.market_cap_rank,
    price_change_percentage_24h: body.price_change_percentage_24h,
    historicalData: body.historicalData,
    image: body.image
  })
  const savedCoin = await coin.save()
  response.json(savedCoin.toJSON())
})

coinsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const coin = {
    current_price: body.current_price,
    market_cap: body.market_cap,
    market_cap_rank: body.market_cap_rank,
    price_change_percentage_24h: body.price_change_percentage_24h,
    historicalData: body.historicalData,
  }
  const updatedCoin = await Coin.findByIdAndUpdate(request.params.id, coin, { new: true })
  if(updatedCoin)
    response.json(updatedCoin.toJSON())
  else {
    console.log("Can't find coin")
    response.sendStatus(404)
  }
   
  
  
})


module.exports = coinsRouter