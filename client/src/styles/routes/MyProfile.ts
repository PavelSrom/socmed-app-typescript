import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: '0 auto',
  },
  fullName: {
    margin: `${theme.spacing(2)}px 0`,
  },
  btn: {
    display: 'block',
    margin: '0 auto',
    marginTop: theme.spacing(4),
  },
}))
