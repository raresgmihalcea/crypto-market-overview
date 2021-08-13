import React from 'react'
import Crypto from './pages/Crypto'
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from './components/AppBar'
import {createTheme, ThemeProvider } from '@material-ui/core'

const theme = createTheme({
  palette:{
    primary:{
      main: '#333'
    }
  }
})

export default function App() {
  return (
    <ThemeProvider theme = {theme}>
      <CssBaseline />
      <AppBar />
      <Crypto />
    </ThemeProvider>
  )
}
