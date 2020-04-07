import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, TextField, Button, CircularProgress } from '@material-ui/core'
import { ResponsiveContainer } from '../utils/Responsive'
import { registerUser } from '../store/actions/auth'
import { AppState } from '../store'
import styles from '../styles/routes/Register'

export interface RegisterForm {
  fullName: string
  email: string
  password: string
  avatar: any
}

const Register: React.FC = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector((state: AppState) => state.auth.isAuthenticated)
  const classes = styles()
  const [loading] = useState<boolean>(false)
  const [form, setForm] = useState<RegisterForm>({
    fullName: '',
    email: '',
    password: '',
    avatar: null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'avatar') {
      setForm({ ...form, avatar: e.target.files![0] })
    } else {
      setForm({ ...form, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (form.avatar) dispatch(registerUser(form))
  }

  if (isAuth) return <Redirect to="/me" />

  return (
    <ResponsiveContainer
      style={{
        background: 'linear-gradient(360deg, #e3f2fd, #90caf9)',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" className={classes.headline}>
        Register in the system
      </Typography>

      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          fullWidth
          name="fullName"
          value={form.fullName}
          label="Full name"
          onChange={handleChange}
          variant="outlined"
          className={classes.input}
        />
        <TextField
          type="email"
          fullWidth
          name="email"
          value={form.email}
          label="Email"
          onChange={handleChange}
          variant="outlined"
          className={classes.input}
        />
        <TextField
          type="password"
          fullWidth
          name="password"
          value={form.password}
          label="Password"
          onChange={handleChange}
          variant="outlined"
          className={classes.input}
        />
        <TextField
          type="file"
          fullWidth
          name="avatar"
          onChange={handleChange}
          variant="outlined"
          className={classes.input}
        />

        {loading && <CircularProgress color="primary" />}
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          Register
        </Button>
        <Typography variant="caption" component={Link} to="/login">
          Already registered?
        </Typography>
      </form>
    </ResponsiveContainer>
  )
}

export default Register
