import React, { useState } from 'react'
import { Snackbar, SnackbarCloseReason } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useSelector } from 'react-redux'
import { AppState } from '../store'

const AlertBox: React.FC = () => {
  const alerts = useSelector((state: AppState) => state.visual.alerts)
  const [open, setOpen] = useState<boolean>(true)

  const handleClose = (
    e: React.SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') return

    setOpen(false)
  }

  return (
    <>
      {alerts.length > 0 &&
        alerts.map(({ id, type, message }) => (
          <Snackbar key={id} open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert variant="filled" severity={type}>
              {message}
            </Alert>
          </Snackbar>
        ))}
    </>
  )
}

export default AlertBox
