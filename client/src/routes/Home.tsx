import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Button } from '@material-ui/core'
import styles from '../styles/routes/Home'

const Home: React.FC = () => {
  const classes = styles()

  return (
    <div className={classes.container}>
      <div>
        <Typography variant="h4">Social media app</Typography>
        <Typography variant="body1">Share your experiences with others</Typography>
      </div>
      <div className={classes.btnBox}>
        <Button component={Link} to="/register" color="primary" variant="outlined">
          Register
        </Button>
        <Button component={Link} to="/login" color="primary" variant="outlined">
          Login
        </Button>
      </div>
    </div>
  )
}

export default Home
