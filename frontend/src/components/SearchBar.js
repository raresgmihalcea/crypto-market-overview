import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({

  IconButton: {
    marginRight:theme.spacing(2)
  },

  barContainer: {
    display:'flex',
    marginLeft: '19%',
    marginTop: theme.spacing(10),
    width: '100%',
  },

  searchBar: {
    margin: theme.spacing(2),
    display:'flex',
    border:'1px solid darkgrey',
    borderRadius: theme.spacing(2),
    width:'25%'
  },

  input: {
    marginLeft: theme.spacing(2),
    flexGrow:'1'
  },

}))

export default function Searchbar({handleFilter, resetFilter}) {
  const classes = useStyles()
  const [displayFilter, setDisplayFilter] = useState('')
  return (
    <div className = {classes.barContainer}>
      <Paper component="form" className = {classes.searchBar} >
        <InputBase
          type = 'text'
          className={classes.input}
          onChange = {(e) => {handleFilter(e); setDisplayFilter(e.target.value)}}
          value = {displayFilter}
          placeholder="Search Here "
          inputProps={{
            maxLength: 25,
          }}
        />
        <IconButton className = {classes.IconButton} onClick = {() => {
          setDisplayFilter('')
          resetFilter()
          }} >
          <CloseIcon />
        </IconButton>
      </Paper>
    </div>
  )
}
