import Stack from '@mui/material/Stack'
import Version from '../UI/Version'
import Header from '../UI/Header'
import { useState } from 'react'
import preferences from '../core/Preferences'
import OverallSwitch from '../UI/OverallSwitch'

function App() {
  const [isNetflixHotkeysEnable, setIsNetflixHotkeysEnable] = useState(
    preferences.isNetflixHotkeysEnabled,
  )

  const netflixHotkeysToggle = () => {
    preferences.isNetflixHotkeysEnabled = !isNetflixHotkeysEnable
    setIsNetflixHotkeysEnable(!isNetflixHotkeysEnable)
  }

  return (
    <Stack direction="column" spacing={1.5}>
      <Header />

      <OverallSwitch
        isNetflixHotkeysEnable={isNetflixHotkeysEnable}
        onToggle={netflixHotkeysToggle}
      />

      <Version />
    </Stack>
  )
}

export default App
