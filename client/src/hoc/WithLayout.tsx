import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles, BottomNavigation, BottomNavigationAction } from '@material-ui/core'

import PersonIcon from '@material-ui/icons/Person'
import ChatIcon from '@material-ui/icons/Chat'

const useStyles = makeStyles((theme) => ({
  nav: {
    backgroundColor: theme.palette.primary.main,
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
}))

interface Props {
  children: React.ReactNode
}

const WithLayout: React.FC<Props> = ({ children }) => {
  const [value, setValue] = useState<number>(0)
  const [links] = useState([
    {
      label: 'My profile',
      url: '/me',
      icon: <PersonIcon />,
    },
    {
      label: 'Feed',
      url: '/posts',
      icon: <ChatIcon />,
    },
  ])
  const classes = useStyles()

  const handleChange = (e: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <>
      {children}
      <BottomNavigation className={classes.nav} value={value} onChange={handleChange}>
        {links.map(({ label, url, icon }) => (
          <BottomNavigationAction
            component={Link}
            to={url}
            key={url}
            label={label}
            icon={icon}
            style={{ color: '#fff' }}
          />
        ))}
      </BottomNavigation>
    </>
  )
}

export default WithLayout
