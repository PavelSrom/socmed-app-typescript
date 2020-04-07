import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, TextField, Button, CircularProgress } from '@material-ui/core'
import { ResponsiveContainer } from '../utils/Responsive'
import { loginUser } from '../store/actions/auth'
import { AppState } from '../store'
import styles from '../styles/routes/Login'

interface LoginForm {
  email: string
  password: string
}

const Login: React.FC = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector((state: AppState) => state.auth.isAuthenticated)
  const classes = styles()
  const [loading] = useState<boolean>(false)
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(loginUser(form))
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
        Log in to your account
      </Typography>

      <form className={classes.form} onSubmit={handleSubmit}>
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

        {loading && <CircularProgress color="primary" />}
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          Login
        </Button>
        <Typography variant="caption" component={Link} to="/register">
          Don't have an account?
        </Typography>
      </form>
    </ResponsiveContainer>
  )
}

export default Login
