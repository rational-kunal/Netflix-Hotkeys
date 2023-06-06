import { useEffect, useState } from 'react'
import { preferences } from '../../core/Preferences'

// TODO: This is really inefficient. Check if there is a way to create a single hook.

// Custom hook to get and set preferences
// A layer between UI and core
function usePreferences() {
  const [isNetflixHotkeysEnabled, setIsNetflixHotkeysEnabled] = useState(preferences.isNetflixHotkeysEnabled)
  const [isSlowSeekEnabled, setIsSlowSeekEnabled] = useState(preferences.isSlowSeekEnabled)
  const [isPowerSkipEnabled, setIsPowerSkipEnabled] = useState(preferences.isPowerSkipEnabled)
  const [isAutoLoginEnabled, setIsAutoLoginEnabled] = useState(preferences.isAutoLoginEnabled)
  const [usernameList, setUsernameList] = useState(preferences.usernameList)
  const [defaultUsername, setDefaultUsername] = useState(preferences.defaultUsername)
  const [profilePassword, setProfilePassword] = useState(preferences.profilePassword)
  const [isStartNextEpisodeEnabled, setIsStartNextEpisodeEnabled] = useState(preferences.isStartNextEpisodeEnabled)
  const [isStartOverEpisodeEnabled, setIsStartOverEpisodeEnabled] = useState(preferences.isStartOverEpisodeEnabled)

  // Listen to changes in preferences
  // Currently we are listening to only required preferences to avoid unnecessary re-renders
  useEffect(() => {
    const updateNetflixHotkeys = () => setIsNetflixHotkeysEnabled(preferences.isNetflixHotkeysEnabled)
    preferences.on('isNetflixHotkeysEnabled', updateNetflixHotkeys)
    return () => preferences.off('isNetflixHotkeysEnabled', updateNetflixHotkeys)
  }, [])

  useEffect(() => {
    const updateIsAutoLoginEnabled = () => setIsAutoLoginEnabled(preferences.isAutoLoginEnabled)
    preferences.on('isAutoLoginEnabled', updateIsAutoLoginEnabled)
    return () => preferences.off('isAutoLoginEnabled', updateIsAutoLoginEnabled)
  }, [])

  useEffect(() => {
    const updateUsernameList = () => setUsernameList(preferences.usernameList)
    preferences.on('usernameList', updateUsernameList)
    return () => preferences.off('usernameList', updateUsernameList)
  }, [])

  // Update respective preference when value is changed
  useEffect(() => {
    preferences.isNetflixHotkeysEnabled = isNetflixHotkeysEnabled
  }, [isNetflixHotkeysEnabled])

  useEffect(() => {
    preferences.isSlowSeekEnabled = isSlowSeekEnabled
  }, [isSlowSeekEnabled])

  useEffect(() => {
    preferences.isPowerSkipEnabled = isPowerSkipEnabled
  }, [isPowerSkipEnabled])

  useEffect(() => {
    preferences.isAutoLoginEnabled = isAutoLoginEnabled
  }, [isAutoLoginEnabled])

  useEffect(() => {
    preferences.defaultUsername = defaultUsername
  }, [defaultUsername])

  useEffect(() => {
    preferences.profilePassword = profilePassword
  }, [profilePassword])

  useEffect(() => {
    preferences.isStartNextEpisodeEnabled = isStartNextEpisodeEnabled
  }, [isStartNextEpisodeEnabled])

  useEffect(() => {
    preferences.isStartOverEpisodeEnabled = isStartOverEpisodeEnabled
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
