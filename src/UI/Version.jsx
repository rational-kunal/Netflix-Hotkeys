import Typography from '@mui/material/Typography'

function Version() {
  const version = `v${chrome.runtime.getManifest().version}`
  return <Typography variant="subtitle1">{version}</Typography>
}

export default Version
