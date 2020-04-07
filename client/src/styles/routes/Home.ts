import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  container: {
    background: 'linear-gradient(360deg, #e3f2fd, #90caf9)',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(4),
  },
  btnBox: {
    width: 300,
    display: 'flex',
    justifyContent: 'space-between',
  },
}))
