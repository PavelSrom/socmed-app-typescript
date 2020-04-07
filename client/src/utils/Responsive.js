import React from 'react'
import { Container } from '@material-ui/core'
import { useResponsiveDesign } from './hooks'

export const ResponsiveContainer = ({ children, style, ...rest }) => {
  const { spacing } = useResponsiveDesign()

  const customStyle = {
    paddingTop: spacing,
    paddingBottom: spacing,
    ...style,
  }

  return (
    <Container style={customStyle} fixed maxWidth="lg" {...rest}>
      {children}
    </Container>
  )
}
