import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import Version from '../UI/Version'
import Header from '../UI/Header'
import { useState } from 'react'
import preferences from '../core/Preferences'
import OverallSwitch from '../UI/OverallSwitch'
import FeatureList from '../UI/FeatureList'

function App() {
  const [isNetflixHotkeysEnable, setIsNetflixHotkeysEnable] = useState(
    preferences.isNetflixHotkeysEnabled,
  )
  const [isSkipIntroEnable, setIsSkipIntroEnable] = useState(preferences.isSkipIntroEnabled)

  const netflixHotkeysToggle = () => {
    preferences.isNetflixHotkeysEnabled = !isNetflixHotkeysEnable
    setIsNetflixHotkeysEnable(!isNetflixHotkeysEnable)
  }

  const skipIntroToggle = () => {
    preferences.isSkipIntroEnabled = !isSkipIntroEnable
    setIsSkipIntroEnable(!isSkipIntroEnable)
  }

  const featureListOrWarning = isNetflixHotkeysEnable ? (
    <FeatureList isSkipIntroEnable={isSkipIntroEnable} skipIntroToggle={skipIntroToggle} />
  ) : (
    <Alert severity="warning">
      To activate the ultimate power to binge watch please enable the Netflix Hotkeys
    </Alert>
  )

  return (
    <Stack direction="column" spacing={1.5}>
      <Header />

      <OverallSwitch
        isNetflixHotkeysEnable={isNetflixHotkeysEnable}
        onToggle={netflixHotkeysToggle}
      />

      {featureListOrWarning}

      <Version />
    </Stack>
  )
}

export default App
