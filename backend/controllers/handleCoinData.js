const axios = require('axios')
const CoinGecko = require('coingecko-api')
const Coin = require('../models/coin')
const CoinClient = new CoinGecko()

baseURL = process.env.baseURL || "http://localhost:3001" //url needed for axios requests. If not defined, use localhost


const setCoins = async () => { 
  Coin.remove({}, function(err) { 
    console.log('collection removed') 
  });
  
  const coinData = await CoinClient.coins.markets({per_page: 50, vs_currency: 'usd'})
  coinData.data.forEach(coin => axios.post(`${baseURL}/api/coins`, coin)
    .then(res => console.log(res.data.name, "Added")))
}

const setCoinsOrdered = async () => {
  Coin.remove({}, function(err) { 
    console.log('collection removed')

 });
  
 const coinData = await CoinClient.coins.markets({per_page: 50, vs_currency: 'usd'})  
  for(const coin of coinData.data) {
    const addedCoin = await axios.post(`${baseURL}/api/coins`, coin) 
    console.log(addedCoin.data.name, "Added")
    
  }
}

//Return prices for a single coin (hourly for the last 7 days) 
const getPrices = async (coinId) => {
  const prices = await CoinClient.coins.fetchMarketChart(coinId, {days: '7', vs_currency: 'usd', interval: 'hourly'})
  return prices.data.prices
}

//Return id of stored coins
const getCoinList = async () => {
  const data = await(Coin.find({}))
  const coinList = data.map(coin => coin._id)
  return coinList
}

/**
  * Get id of stored coins,
  * Get historical data for each id,
  * Save historical data in database,
  * Return saved data.
 * */

const updateHistoricalData = async () => {
  const coinList = await getCoinList()
  const data = await(Promise.all(coinList.map(async (coin) => 
  await Coin.findByIdAndUpdate(
    coin, {historicalPrices: await getPrices(coin)}, {new: true}) 
    )))
  console.log('Historical Data Updated')
  return data
}

/**
 *  Make a new request to coingecko and sends a local put request with the relevant data.
 ** Updates data in an unordered manner
 */

const updateCoins = async () => {
  const coinData = await CoinClient.coins.markets({per_page: 50, vs_currency: 'usd'})
  coinData.data.forEach(coin => {
    const updatedCoin = {
      current_price: coin.current_price,
      market_cap: coin.market_cap,
      market_cap_rank: coin.market_cap_rank,
      price_change_percentage_24h: coin.price_change_percentage_24h
    }
    axios.put(`${baseURL}/api/coins/${coin.id}`, updatedCoin)
      .then(res=>res.data)
      .catch( async (err) => {
        if(err.response.status === 404){
          const addedCoin = await axios.post(`${baseURL}/api/coins`, coin) 
          console.log(addedCoin.data.name, "Added")
      }
    })
  })
}


module.exports = {
  setCoins,
  setCoinsOrdered,
  updateCoins,
  getCoinList,
  updateHistoricalData,
  baseURL
}