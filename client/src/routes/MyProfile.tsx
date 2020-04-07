import React from 'react'
import { ResponsiveContainer } from '../utils/Responsive'
import { Avatar, Typography, Button } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../store'
import { logoutUser, deleteUserAccount } from '../store/actions/auth'
import { useHistory } from 'react-router-dom'
import styles from '../styles/routes/MyProfile'

const MyProfile: React.FC = () => {
  const history = useHistory()
  const classes = styles()
  const dispatch = useDispatch()
  const user = useSelector((state: AppState) => state.auth.user)

  const handleAccountDeletion = () => {
    const isSure = window.confirm(
      'Are you sure? This action will delete your account and all your posts, and is irreversible!'
    )

    return isSure ? dispatch(deleteUserAccount(history)) : null
  }

  return (
    <ResponsiveContainer style={{ textAlign: 'center' }}>
      <Avatar src={user!.avatar} className={classes.avatar} />
      <Typography variant="h4" className={classes.fullName}>
        {user!.fullName}
      </Typography>
      <Typography variant="body1">{user!.email}</Typography>

      <Button
        variant="outlined"
        color="secondary"
        className={classes.btn}
        onClick={handleAccountDeletion}
      >
        Delete account
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.btn}
        onClick={() => dispatch(logoutUser(history))}
      >
        Log out
      </Button>
    </ResponsiveContainer>
  )
}

export default MyProfile
