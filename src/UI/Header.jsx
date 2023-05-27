import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

function Header() {
  const name = chrome.runtime.getManifest().name
  const description = chrome.runtime.getManifest().description
  return (
    <Stack direction="column">
      <Typography variant="h2"> {name} </Typography>
      <Typography variant="subtitle1"> {description} </Typography>
    </Stack>
  )
}

export default Header
