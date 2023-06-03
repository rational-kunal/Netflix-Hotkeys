import './main.css'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import Version from '../UI/Version'
import Header from '../UI/Header'
import OverallSwitch from '../UI/OverallSwitch'
import Typography from '@mui/material/Typography'
import usePreferences from '../UI/hooks/usePreferences'
import { FeatureControl } from '../UI/FeatureControl'

function App() {
  const { isNetflixHotkeysEnabled } = usePreferences().netflixHotkeys
  const featureListOrWarning = isNetflixHotkeysEnabled ? (
    <FeatureControl />
  ) : (
    <Alert severity="warning">
      <Typography variant="subtitle2">
        To activate the ultimate power to binge watch please enable the Netflix Hotkeys
      </Typography>
    </Alert>
  )

  return (
    <Stack direction="column" spacing={1.5}>
      <Header />
      <OverallSwitch />
      {featureListOrWarning}
      <Version />
    </Stack>
  )
}

export default App
