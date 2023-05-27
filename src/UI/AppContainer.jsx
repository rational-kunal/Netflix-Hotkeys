import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import BebasNeueTTF from '../assets/BebasNeue.ttf'
import MontserratTTF from '../assets/Montserrat.ttf'
import SourceSansProTTF from '../assets/SourceSansPro.ttf'

const FontStyleOverride = (fontName, font) => `
@font-face {
  font-family: '${fontName}';
  font-style: normal;
  font-display: swap;
  font-weight: 400;
  src: local('${fontName}'), url(${font}) format('truetype');
  unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
};
`

const theme = createTheme({
  typography: {
    h2: { fontFamily: 'Bebas Neue, sans-serif' },
    subtitle2: { fontFamily: 'Source Sans Pro, sans-serif' },
    fontFamily: 'Montserrat, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        ${FontStyleOverride('Bebas Neue', BebasNeueTTF)}
        ${FontStyleOverride('Montserrat', MontserratTTF)}
        ${FontStyleOverride('Source Sans Pro', SourceSansProTTF)}
      `,
    },
  },
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
