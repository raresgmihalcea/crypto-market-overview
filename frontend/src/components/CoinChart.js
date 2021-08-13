import React from 'react'
import { Typography } from '@material-ui/core';
import { LineChart, Line, YAxis, ResponsiveContainer } from 'recharts';


export default function CoinChart({historicalPrices}) {
  if(historicalPrices.length < 1)
    return(
      <Typography variant='subtitle2'>No Data Available</Typography>
    )
  const data = historicalPrices.map((price,i) => ({name: `${i}`, price:price[1]}))
  const maxPrice = Math.max.apply(Math, data.map(el => el.price))
  return (
    <div style = {{paddingTop:'20px', height:'100%', width: '100%'}}>
    <ResponsiveContainer width="90%" height="100%" debounce = {1}>
    <LineChart width={300} height={100} data={data} >
      <Line isAnimationActive = {false} type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} dot={false} /* animationEasing = {'ease'} animationBegin = {150} animationDuration = {750} */ />
      <YAxis hide = {true} type="number" domain={[maxPrice/1.5,maxPrice]} />
    </LineChart>
    </ResponsiveContainer>
    </div>
  )
}
