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
  const [isPowerSkipEnable, setIsPowerSkipEnable] = useState(preferences.isPowerSkipEnabled)
  const [isAutoLoginEnable, setIsAutoLoginEnable] = useState(preferences.isAutoLoginEnabled)
  const [defaultUsername, setDefaultUsername] = useState(preferences.defaultUsername)
  const [profilePassword, setProfilePassword] = useState(preferences.profilePassword)

  const netflixHotkeysToggle = () => {
    preferences.isNetflixHotkeysEnabled = !isNetflixHotkeysEnable
    setIsNetflixHotkeysEnable(!isNetflixHotkeysEnable)
  }

  const powerSkipToggle = () => {
    preferences.isPowerSkipEnabled = !isPowerSkipEnable
    setIsPowerSkipEnable(!isPowerSkipEnable)
  }

  const autoLoginToggle = () => {
    preferences.isAutoLoginEnabled = !isAutoLoginEnable
    setIsAutoLoginEnable(!isAutoLoginEnable)
  }

  const onUsernameSelect = (username) => {
    preferences.defaultUsername = username
    setDefaultUsername(username)
  }

  const onProfilePasswordChange = (password) => {
    preferences.profilePassword = password
    setProfilePassword(password)
  }

  const featureListOrWarning = isNetflixHotkeysEnable ? (
    <FeatureList
      isPowerSkipEnable={isPowerSkipEnable}
      powerSkipToggle={powerSkipToggle}
      isAutoLoginEnable={isAutoLoginEnable}
      autoLoginToggle={autoLoginToggle}
      usernameList={preferences.usernameList}
      defaultUsername={defaultUsername}
      onUsernameSelect={onUsernameSelect}
      profilePassword={profilePassword}
      onProfilePasswordChange={onProfilePasswordChange}
    />
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
