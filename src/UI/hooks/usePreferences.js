import { useEffect, useState } from 'react'
import { Preferences } from '../../core/Preferences'

// TODO: This is really inefficient. Check if there is a way to create a single hook.

// Custom hook to get and set preferences
// A layer between UI and core
function usePreferences() {
  const [isNetflixHotkeysEnabled, setIsNetflixHotkeysEnabled] = useState(Preferences.instance.isNetflixHotkeysEnabled)
  const [isSlowSeekEnabled, setIsSlowSeekEnabled] = useState(Preferences.instance.isSlowSeekEnabled)
  const [isPowerSkipEnabled, setIsPowerSkipEnabled] = useState(Preferences.instance.isPowerSkipEnabled)
  const [isAutoLoginEnabled, setIsAutoLoginEnabled] = useState(Preferences.instance.isAutoLoginEnabled)
  const [usernameList, setUsernameList] = useState(Preferences.instance.usernameList)
  const [defaultUsername, setDefaultUsername] = useState(Preferences.instance.defaultUsername)
  const [profilePassword, setProfilePassword] = useState(Preferences.instance.profilePassword)
  const [isStartNextEpisodeEnabled, setIsStartNextEpisodeEnabled] = useState(
    Preferences.instance.isStartNextEpisodeEnabled,
  )
  const [isStartOverEpisodeEnabled, setIsStartOverEpisodeEnabled] = useState(
    Preferences.instance.isStartOverEpisodeEnabled,
  )

  // Listen to changes in preferences
  // Currently we are listening to only required preferences to avoid unnecessary re-renders
  useEffect(() => {
    const updateNetflixHotkeys = () => setIsNetflixHotkeysEnabled(Preferences.instance.isNetflixHotkeysEnabled)
    Preferences.instance.on('isNetflixHotkeysEnabled', updateNetflixHotkeys)
    return () => Preferences.instance.off('isNetflixHotkeysEnabled', updateNetflixHotkeys)
  }, [])

  useEffect(() => {
    const updateIsAutoLoginEnabled = () => setIsAutoLoginEnabled(Preferences.instance.isAutoLoginEnabled)
    Preferences.instance.on('isAutoLoginEnabled', updateIsAutoLoginEnabled)
    return () => Preferences.instance.off('isAutoLoginEnabled', updateIsAutoLoginEnabled)
  }, [])

  useEffect(() => {
    const updateUsernameList = () => setUsernameList(Preferences.instance.usernameList)
    Preferences.instance.on('usernameList', updateUsernameList)
    return () => Preferences.instance.off('usernameList', updateUsernameList)
  }, [])

  // Update respective preference when value is changed
  useEffect(() => {
    Preferences.instance.isNetflixHotkeysEnabled = isNetflixHotkeysEnabled
  }, [isNetflixHotkeysEnabled])

  useEffect(() => {
    Preferences.instance.isSlowSeekEnabled = isSlowSeekEnabled
  }, [isSlowSeekEnabled])

  useEffect(() => {
    Preferences.instance.isPowerSkipEnabled = isPowerSkipEnabled
  }, [isPowerSkipEnabled])

  useEffect(() => {
    Preferences.instance.isAutoLoginEnabled = isAutoLoginEnabled
  }, [isAutoLoginEnabled])

  useEffect(() => {
    Preferences.instance.defaultUsername = defaultUsername
  }, [defaultUsername])

  useEffect(() => {
    Preferences.instance.profilePassword = profilePassword
  }, [profilePassword])

  useEffect(() => {
    Preferences.instance.isStartNextEpisodeEnabled = isStartNextEpisodeEnabled
  }, [isStartNextEpisodeEnabled])

  useEffect(() => {
    Preferences.instance.isStartOverEpisodeEnabled = isStartOverEpisodeEnabled
  }, [isStartOverEpisodeEnabled])

  return {
    netflixHotkeys: { isNetflixHotkeysEnabled, setIsNetflixHotkeysEnabled },
    slowSeek: { isSlowSeekEnabled, setIsSlowSeekEnabled },
    powerSkip: { isPowerSkipEnabled, setIsPowerSkipEnabled },
    autoLogin: { isAutoLoginEnabled, setIsAutoLoginEnabled },
    usernameList: usernameList,
    defaultUsername: { defaultUsername, setDefaultUsername },
    profilePassword: { profilePassword, setProfilePassword },
    startNextEpisode: { isStartNextEpisodeEnabled, setIsStartNextEpisodeEnabled },
    startOverEpisode: { isStartOverEpisodeEnabled, setIsStartOverEpisodeEnabled },
  }
}

export default usePreferences
