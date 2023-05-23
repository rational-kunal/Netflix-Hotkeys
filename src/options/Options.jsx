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

  return (
    <Stack direction="column" spacing={1.5}>
      <Header />

      <OverallSwitch
        isNetflixHotkeysEnable={isNetflixHotkeysEnable}
        onToggle={netflixHotkeysToggle}
      />

      <FeatureList isSkipIntroEnable={isSkipIntroEnable} skipIntroToggle={skipIntroToggle} />

      <Version />
    </Stack>
  )
}

export default App
