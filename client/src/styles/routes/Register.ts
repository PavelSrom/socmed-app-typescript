import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  headline: {
    textAlign: 'center',
    marginBottom: theme.spacing(6),
  },
  form: {
    maxWidth: 600,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    marginBottom: theme.spacing(3),
  },
}))
