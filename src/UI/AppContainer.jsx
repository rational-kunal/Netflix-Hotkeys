import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

const theme = createTheme({
  palette: { mode: 'dark' },
})

function AppContainer(props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ marginTop: 3.5 }} maxWidth="sm">
        <Box>{props.children}</Box>
      </Container>
    </ThemeProvider>
  )
}

export default AppContainer
