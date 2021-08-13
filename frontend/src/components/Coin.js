import React from 'react'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import CoinChart from './CoinChart'


export default function Coin({coin}) {

  return (
    <React.Fragment>
      <Grid item md = {2}>
        <Typography style={{display:'flex', marginLeft: '30%',  alignContent: 'center', justifyContent:'flex-start' }} variant='subtitle2'>
          <img  
          alt = {coin.name} 
          width = '26px' 
          height = '26px' 
          style={{marginRight: '8px'}}
          src = {coin.image} /> 
          {coin.name}
        </Typography>
        <Divider style = {{marginLeft: '16px', marginBottom: '1px'}} />
      </Grid>
      <Grid item md = {2}>
        <Typography variant='subtitle2' style={{}}>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(coin.current_price)}</Typography>
        <Divider />
      </Grid>
      <Grid item md = {2}>
        <Typography variant='subtitle2'>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(coin.market_cap)}</Typography>
        <Divider />
      </Grid>
      <Grid item md = {2}>
        <Typography style  = {coin.price_change_percentage_24h > 0 ? {color:'green'} : {color:'red'} } variant='subtitle2'>{ parseFloat(coin.price_change_percentage_24h ).toFixed(2) + '%'}</Typography>
        <Divider/>
      </Grid>
      <Grid style ={{maxHeight: '100px', position: 'relative', zIndex: '0'}} item md = {4}>
        <CoinChart historicalPrices = {coin.historicalPrices} />
        <Divider style = {{marginRight: '16px',}}/>
      </Grid>
      
    </React.Fragment>
  )
}