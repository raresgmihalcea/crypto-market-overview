import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  
}));

export default function Bar() {
  const classes = useStyles();
  return (
    <AppBar 
        position="fixed"
      >
        <Toolbar>
          <Typography variant="h5" className = {classes.title} noWrap>
            Market Overview
          </Typography>
        </Toolbar>
      </AppBar>
  )
}
