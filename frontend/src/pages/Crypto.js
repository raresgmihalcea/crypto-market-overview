import React, { useState, useEffect} from 'react'
import coinService from '../components/services/coins'
import { makeStyles } from '@material-ui/core'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Coin from '../components/Coin'
import SearchBar from '../components/SearchBar'
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider'
import SwapVertIcon from '@material-ui/icons/SwapVert';
import CircularProgress from '@material-ui/core/CircularProgress';
import useInterval from '../components/hooks/useInterval'
import debounce from 'lodash/debounce'


const useStyles = makeStyles((theme) => ({
  button: {
    margin: '12px',
    whiteSpace: 'noWrap',
  },
  root: {
    display:'flex',
    flexDirection:'column' ,
    justifyContent: 'center', 
    alignItems:'center',
  },

  container: {
    width:'80%', 
    background: "#fcfcfc", 
    borderRadius: '16px',
    boxShadow: '0px 0px 8px -3px #666666',
    overflow:'auto',
    overflowX:'hidden',
    maxHeight: '80vh',
    "&::-webkit-scrollbar": {
      width: 7,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "darkgrey",
      borderRadius:'23px'
    },
    scrollbarWidth: 'thin',
    scrollbarColor: 'darkgrey transparent',

  },
  gridHead: {
    width: '100%', 
    display:'flex', 
    justifyContent:'center', 
    alignContent: 'center', 
    position: 'sticky', 
    zIndex:'1',
    top:'0', 
    backgroundColor:'#fcfcfc',
  },
  currentPage : {
    color:theme.palette.secondary.main
  },

}))



const theme = createTheme({
  overrides: {
    MuiTypography: {
      root: {
        minHeight:'100px',
        width:'100%',
        whiteSpace: 'nowrap',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
      },
    },
  },
});

export default function Crypto() { 
  const [coinData, setCoinData] = useState([])
  const [filter, setFilter] = useState('')
  const [filteredList, setFilteredList] = useState([])
  const [order, setOrder] = useState({name: 1, price: 1, marketCap: 1, priceChange : 1})
  const [loading, setLoading] = useState(true)
  const classes = useStyles()
  
  // If filter is not empty display the filtered list
  const coinsToShow = filteredList.length > 0 ? filteredList : [] 

  //Get data on page load
  useEffect(() => {
    coinService.getAll().then(coins =>{
      setCoinData(coins.sort((a,b) => b.market_cap - a.market_cap))
      setLoading('false')
    } )
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      coinService.getAll().then(coins =>{
        setCoinData(coinData.map(coin => coins.find(el => el.name === coin.name)))
      }).catch(err => console.log(err))
    },60000)
    return () => {
      clearInterval(intervalId)
      //console.log("Interval cleanup")
    } 
  },[coinData])

  //Update data every 60 s
  useInterval(() => {
    coinService.getAll().then(coins =>{
      setCoinData(coinData.map(coin => coins.find(el => el.name === coin.name)))
    })
  },60000)
  
  //Check if filter is empty and filter the list every time the filter or data is modified
  useEffect(() => {
   filter !== ''
    ? setFilteredList(coinData.filter(coin => 
        coin.name.toLowerCase().includes(filter.toLowerCase())))
    : setFilteredList(coinData)
  },[filter, coinData])


  //Handle data sorting
  const sortData = (sortBy, order) => {
    order === 1
      ? sortBy === 'name' 
        ? coinsToShow.sort((a,b) => a.name > b.name)
        : coinsToShow.sort((a,b) => a[sortBy] - b[sortBy])
      : sortBy === 'name' 
        ? coinsToShow.sort((a,b) => a.name < b.name)
        : coinsToShow.sort((a,b) => b[sortBy] - a[sortBy])
  }
  
  //Debounce filter to limit number of search updates in a certain time interval
  const handleFilter = (e) => {
    const debouncedFilter = debounce( () => setFilter(e.target.value), 450)
    debouncedFilter()
  }

  //Make filter empty
  const resetFilter = (field) => {
    setFilter('')
  }

  return (
  <ThemeProvider theme={theme}>
    <div className = {classes.root}>  
      <SearchBar handleFilter = {handleFilter} resetFilter = {resetFilter}/>
      <Grid container className = {classes.container}  align = 'center'>
        <div className = {classes.gridHead}>
          <Grid item md = {2}>
            <Button
              color = 'default'
              className = {classes.button}
              endIcon = {<SwapVertIcon />}
              onClick = {() => {
                console.log('clicked')
                sortData('name', order.name)
                setOrder({...order, name: order.name === 1 ? -1 : 1 })
              }}
            > Name </Button>
            <Divider />
          </Grid>
          <Grid item md = {2}>
          <Button
              color = 'default'
              className = {classes.button}
              endIcon = {<SwapVertIcon />}
              onClick = {() => {
                sortData('current_price', order.price)
                setOrder({...order, price: order.price === 1 ? -1 : 1 })
              }}
            > Last Price </Button>
            <Divider />
          </Grid>
          <Grid item md = {2}>
          <Button
              color = 'default'
              className = {classes.button}
              endIcon = {<SwapVertIcon />}
              onClick = {() => {
                sortData('market_cap', order.marketCap)
                setOrder({...order, marketCap: order.marketCap === 1 ? -1 : 1 })
              }}
            > Market Cap </Button>
            <Divider />
          </Grid>
          <Grid item md = {2}>
          <Button
              color = 'default'
              className = {classes.button}
              onClick = {() => {
                sortData('price_change_percentage_24h', order.priceChange)
                setOrder({...order, priceChange: order.priceChange === 1 ? -1 : 1 })
              }}
              endIcon = {<SwapVertIcon />}
            > Change (24h) </Button>
            <Divider />
          </Grid>
          <Grid item md = {4}>
            <Button 
              disabled
              className = {classes.button}
              style = {{color: 'black'}} 
              > Last 7 Days </Button>
            <Divider />
          </Grid>
        </div>
        {loading === true ? <CircularProgress style ={{position: 'relative', marginLeft:'40%'}} /> : null}
        {coinsToShow.map(coin => 
          <Grid container key = {coin.name}>
            <Coin coin = {coin} />
          </Grid>
        )} 
      </Grid>
    </div>
  </ThemeProvider>
    
  )
}
