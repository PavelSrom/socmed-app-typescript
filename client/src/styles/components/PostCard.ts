import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  img: {
    maxWidth: '100%',
    height: 'auto',
    marginBottom: theme.spacing(1),
  },
  name: {
    fontWeight: 'bold',
  },
  divider: {
    margin: `${theme.spacing(1)}px 0`,
  },
  buttonBox: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  sendIcon: {
    color: theme.palette.primary.main,
  },
  commentBubble: {
    padding: theme.spacing(1),
    background: '#f4f4f4',
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(0.5),
  },
}))
