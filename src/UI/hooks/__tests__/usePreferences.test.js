import usePreferences from '../usePreferences'
import { renderHook, act } from '@testing-library/react'
import { Preferences } from '../../../core/Preferences'

describe('usePreferences', () => {
  describe('should get and set value of', () => {
    // Initially set preferences value to non-default value so that we can test that value is read from preferences
    beforeEach(() => {
      Preferences.instance.isNetflixHotkeysEnabled = true
      Preferences.instance.isSlowSeekEnabled = true
      Preferences.instance.isPowerSkipEnabled = true
      Preferences.instance.isAutoLoginEnabled = true
      Preferences.instance.usernameList = ['test']
      Preferences.instance.defaultUsername = 'test'
      Preferences.instance.profilePassword = 'test'
      Preferences.instance.isStartNextEpisodeEnabled = true
      Preferences.instance.isStartOverEpisodeEnabled = true
    })

    afterEach(() => {
      Preferences.reset()
    })

    it('isNetflixHotkeysEnabled', () => {
      const { result } = renderHook(() => usePreferences())
      expect(result.current.netflixHotkeys.isNetflixHotkeysEnabled).toBe(true)

      act(() => {
        result.current.netflixHotkeys.setIsNetflixHotkeysEnabled(false)
      })

      expect(result.current.netflixHotkeys.isNetflixHotkeysEnabled).toBe(false)
      expect(Preferences.instance.isNetflixHotkeysEnabled).toBe(false)
    })

    it('isSlowSeekEnabled', () => {
      const { result } = renderHook(() => usePreferences())
      expect(result.current.slowSeek.isSlowSeekEnabled).toBe(true)

      act(() => {
        result.current.slowSeek.setIsSlowSeekEnabled(false)
      })

      expect(result.current.slowSeek.isSlowSeekEnabled).toBe(false)
      expect(Preferences.instance.isSlowSeekEnabled).toBe(false)
    })

    it('isPowerSkipEnabled', () => {
      const { result } = renderHook(() => usePreferences())
      expect(result.current.powerSkip.isPowerSkipEnabled).toBe(true)

      act(() => {
        result.current.powerSkip.setIsPowerSkipEnabled(false)
      })

      expect(result.current.powerSkip.isPowerSkipEnabled).toBe(false)
      expect(Preferences.instance.isPowerSkipEnabled).toBe(false)
    })

    it('isAutoLoginEnabled', () => {
      const { result } = renderHook(() => usePreferences())
      expect(result.current.autoLogin.isAutoLoginEnabled).toBe(true)

      act(() => {
        result.current.autoLogin.setIsAutoLoginEnabled(false)
      })

      expect(result.current.autoLogin.isAutoLoginEnabled).toBe(false)
      expect(Preferences.instance.isAutoLoginEnabled).toBe(false)
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
      expect(Preferences.instance.defaultUsername).toBe('test2')
    })

    it('profilePassword', () => {
      const { result } = renderHook(() => usePreferences())
      expect(result.current.profilePassword.profilePassword).toBe('test')

      act(() => {
        result.current.profilePassword.setProfilePassword('test2')
      })

      expect(result.current.profilePassword.profilePassword).toBe('test2')
      expect(Preferences.instance.profilePassword).toBe('test2')
    })

    it('isStartNextEpisodeEnabled', () => {
      const { result } = renderHook(() => usePreferences())
      expect(result.current.startNextEpisode.isStartNextEpisodeEnabled).toBe(true)

      act(() => {
        result.current.startNextEpisode.setIsStartNextEpisodeEnabled(false)
      })

      expect(result.current.startNextEpisode.isStartNextEpisodeEnabled).toBe(false)
      expect(Preferences.instance.isStartNextEpisodeEnabled).toBe(false)
    })

    it('isStartOverEpisodeEnabled', () => {
      const { result } = renderHook(() => usePreferences())
      expect(result.current.startOverEpisode.isStartOverEpisodeEnabled).toBe(true)

      act(() => {
        result.current.startOverEpisode.setIsStartOverEpisodeEnabled(false)
      })

      expect(result.current.startOverEpisode.isStartOverEpisodeEnabled).toBe(false)
      expect(Preferences.instance.isStartOverEpisodeEnabled).toBe(false)
    })
  })

  describe('should update value when preferences value is changed of', () => {
    it('isNetflixHotkeysEnabled', () => {
      const { result } = renderHook(() => usePreferences())
      expect(result.current.netflixHotkeys.isNetflixHotkeysEnabled).toBe(false)

      act(() => {
        Preferences.instance.isNetflixHotkeysEnabled = true
      })

      expect(result.current.netflixHotkeys.isNetflixHotkeysEnabled).toBe(true)
    })

    it('isAutoLoginEnabled', () => {
      const { result } = renderHook(() => usePreferences())
      expect(result.current.autoLogin.isAutoLoginEnabled).toBe(false)

      act(() => {
        Preferences.instance.isAutoLoginEnabled = true
      })

      expect(result.current.autoLogin.isAutoLoginEnabled).toBe(true)
    })

    it('usernameList', () => {
      const { result } = renderHook(() => usePreferences())
      expect(result.current.usernameList).toEqual([])

      act(() => {
        Preferences.instance.usernameList = ['test']
      })

      expect(result.current.usernameList).toEqual(['test'])
    })
  })
})
