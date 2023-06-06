import usePreferences from '../usePreferences'
import { renderHook, act } from '@testing-library/react'
import { preferences } from '../../../core/Preferences'

describe('usePreferences', () => {
  describe('should get and set value of', () => {
    // Initially set preferences value to non-default value so that we can test that value is read from preferences
    // TODO: Create mock for preferences
    beforeEach(() => {
      preferences.isNetflixHotkeysEnabled = true
      preferences.isSlowSeekEnabled = true
      preferences.isPowerSkipEnabled = true
      preferences.isAutoLoginEnabled = true
      preferences.usernameList = ['test']
      preferences.defaultUsername = 'test'
      preferences.profilePassword = 'test'
      preferences.isStartNextEpisodeEnabled = true
      preferences.isStartOverEpisodeEnabled = true
    })

    it('isNetflixHotkeysEnabled', () => {
      const { result } = renderHook(() => usePreferences())
      expect(result.current.netflixHotkeys.isNetflixHotkeysEnabled).toBe(true)

      act(() => {
        result.current.netflixHotkeys.setIsNetflixHotkeysEnabled(false)
      })

      expect(result.current.netflixHotkeys.isNetflixHotkeysEnabled).toBe(false)
      expect(preferences.isNetflixHotkeysEnabled).toBe(false)
    })

    it('isSlowSeekEnabled', () => {
      const { result } = renderHook(() => usePreferences())
      expect(result.current.slowSeek.isSlowSeekEnabled).toBe(true)

      act(() => {
        result.current.slowSeek.setIsSlowSeekEnabled(false)
      })

      expect(result.current.slowSeek.isSlowSeekEnabled).toBe(false)
      expect(preferences.isSlowSeekEnabled).toBe(false)
    })

    it('isPowerSkipEnabled', () => {
      const { result } = renderHook(() => usePreferences())
      expect(result.current.powerSkip.isPowerSkipEnabled).toBe(true)

      act(() => {
        result.current.powerSkip.setIsPowerSkipEnabled(false)
      })

      expect(result.current.powerSkip.isPowerSkipEnabled).toBe(false)
      expect(preferences.isPowerSkipEnabled).toBe(false)
    })

    it('isAutoLoginEnabled', () => {
      const { result } = renderHook(() => usePreferences())
      expect(result.current.autoLogin.isAutoLoginEnabled).toBe(true)

      act(() => {
        result.current.autoLogin.setIsAutoLoginEnabled(false)
      })

      expect(result.current.autoLogin.isAutoLoginEnabled).toBe(false)
      expect(preferences.isAutoLoginEnabled).toBe(false)
    })

    it('usernameList', () => {
      const { result } = renderHook(() => usePreferences())
      expect(result.current.usernameList).toEqual(['test'])
    })

    it('defaultUsername', () => {
      const { result } = renderHook(() => usePreferences())
      expect(result.current.defaultUsername.defaultUsername).toBe('test')

      act(() => {
        result.current.defaultUsername.setDefaultUsername('test2')
      })

      expect(result.current.defaultUsername.defaultUsername).toBe('test2')
      expect(preferences.defaultUsername).toBe('test2')
    })

    it('profilePassword', () => {
      const { result } = renderHook(() => usePreferences())
      expect(result.current.profilePassword.profilePassword).toBe('test')

      act(() => {
        result.current.profilePassword.setProfilePassword('test2')
      })

      expect(result.current.profilePassword.profilePassword).toBe('test2')
      expect(preferences.profilePassword).toBe('test2')
    })

    it('isStartNextEpisodeEnabled', () => {
      const { result } = renderHook(() => usePreferences())
      expect(result.current.startNextEpisode.isStartNextEpisodeEnabled).toBe(true)

      act(() => {
        result.current.startNextEpisode.setIsStartNextEpisodeEnabled(false)
      })

      expect(result.current.startNextEpisode.isStartNextEpisodeEnabled).toBe(false)
      expect(preferences.isStartNextEpisodeEnabled).toBe(false)
    })

    it('isStartOverEpisodeEnabled', () => {
      const { result } = renderHook(() => usePreferences())
      expect(result.current.startOverEpisode.isStartOverEpisodeEnabled).toBe(true)

      act(() => {
        result.current.startOverEpisode.setIsStartOverEpisodeEnabled(false)
      })

      expect(result.current.startOverEpisode.isStartOverEpisodeEnabled).toBe(false)
      expect(preferences.isStartOverEpisodeEnabled).toBe(false)
    })
  })

  describe('should update value when preferences value is changed of', () => {
    // Initially reset the values to default.
    // TODO: Create mock for preferences
    beforeEach(() => {
      preferences.isNetflixHotkeysEnabled = false
      preferences.isSlowSeekEnabled = false
      preferences.isPowerSkipEnabled = false
      preferences.isAutoLoginEnabled = false
      preferences.usernameList = []
      preferences.defaultUsername = ''
      preferences.profilePassword = ''
      preferences.isStartNextEpisodeEnabled = false
      preferences.isStartOverEpisodeEnabled = false
    })

    it('isNetflixHotkeysEnabled', () => {
      const { result } = renderHook(() => usePreferences())
      expect(result.current.netflixHotkeys.isNetflixHotkeysEnabled).toBe(false)

      act(() => {
        preferences.isNetflixHotkeysEnabled = true
      })

      expect(result.current.netflixHotkeys.isNetflixHotkeysEnabled).toBe(true)
    })

    it('isAutoLoginEnabled', () => {
      const { result } = renderHook(() => usePreferences())
      expect(result.current.autoLogin.isAutoLoginEnabled).toBe(false)

      act(() => {
        preferences.isAutoLoginEnabled = true
      })

      expect(result.current.autoLogin.isAutoLoginEnabled).toBe(true)
    })

    it('usernameList', () => {
      const { result } = renderHook(() => usePreferences())
      expect(result.current.usernameList).toEqual([])

      act(() => {
        preferences.usernameList = ['test']
      })

      expect(result.current.usernameList).toEqual(['test'])
    })
  })
})
