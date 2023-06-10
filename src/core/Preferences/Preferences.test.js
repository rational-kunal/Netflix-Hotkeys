import { Preferences } from './index'
import { jest } from '@jest/globals'
import { chrome } from '../../testing/ChromeMock'

describe('Preferences', () => {
  afterEach(() => {
    jest.resetAllMocks()
    Preferences.reset()
  })

  it('should have correct initial values of the fields', () => {
    expect(Preferences.instance.isNetflixHotkeysEnabled).toBe(false)
    expect(Preferences.instance.isSlowSeekEnabled).toBe(false)
    expect(Preferences.instance.isPowerSkipEnabled).toBe(false)
    expect(Preferences.instance.isAutoLoginEnabled).toBe(false)
    expect(Preferences.instance.usernameList).toEqual([])
    expect(Preferences.instance.defaultUsername).toBe('')
    expect(Preferences.instance.profilePassword).toBe('')
    expect(Preferences.instance.isStartNextEpisodeEnabled).toBe(false)
    expect(Preferences.instance.isStartOverEpisodeEnabled).toBe(false)
  })

  describe('should be able to set and get values of', () => {
    it('isNetflixHotkeysEnabled', () => {
      Preferences.instance.isNetflixHotkeysEnabled = true
      expect(Preferences.instance.isNetflixHotkeysEnabled).toBe(true)
    })

    it('isSlowSeekEnabled', () => {
      Preferences.instance.isSlowSeekEnabled = true
      expect(Preferences.instance.isSlowSeekEnabled).toBe(true)
    })

    it('isPowerSkipEnabled', () => {
      Preferences.instance.isPowerSkipEnabled = true
      expect(Preferences.instance.isPowerSkipEnabled).toBe(true)
    })

    it('isAutoLoginEnabled', () => {
      Preferences.instance.isAutoLoginEnabled = true
      expect(Preferences.instance.isAutoLoginEnabled).toBe(true)
    })

    it('usernameList', () => {
      Preferences.instance.usernameList = ['a', 'b', 'c']
      expect(Preferences.instance.usernameList).toEqual(['a', 'b', 'c'])
    })

    it('defaultUsername', () => {
      Preferences.instance.defaultUsername = 'a'
      expect(Preferences.instance.defaultUsername).toBe('a')
    })

    it('profilePassword', () => {
      Preferences.instance.profilePassword = 'b'
      expect(Preferences.instance.profilePassword).toBe('b')
    })

    it('isStartNextEpisodeEnabled', () => {
      Preferences.instance.isStartNextEpisodeEnabled = true
      expect(Preferences.instance.isStartNextEpisodeEnabled).toBe(true)
    })

    it('isStartOverEpisodeEnabled', () => {
      Preferences.instance.isStartOverEpisodeEnabled = true
      expect(Preferences.instance.isStartOverEpisodeEnabled).toBe(true)
    })
  })

  it('should be able to get initial values from the chrome storage', () => {
    chrome.storage.local.get.mockImplementation((keys, callback) => {
      callback({
        isNetflixHotkeysEnabled: true,
        isSlowSeekEnabled: true,
        isPowerSkipEnabled: true,
        isAutoLoginEnabled: true,
        usernameList: ['a', 'b', 'c'],
        defaultUsername: 'a',
        profilePassword: 'b',
        isStartNextEpisodeEnabled: true,
        isStartOverEpisodeEnabled: true,
        isSubtitleToggleEnabled: true,
        isAudioToggleEnabled: true,
      })
    })

    Preferences.instance // // Access once to build the storage

    expect(chrome.storage.local.get).toHaveBeenCalledWith(
      [
        'isNetflixHotkeysEnabled',
        'isSlowSeekEnabled',
        'isPowerSkipEnabled',
        'isAutoLoginEnabled',
        'usernameList',
        'defaultUsername',
        'profilePassword',
        'isStartNextEpisodeEnabled',
        'isStartOverEpisodeEnabled',
        'isSubtitleToggleEnabled',
        'isAudioToggleEnabled',
      ],
      expect.any(Function),
    )

    expect(Preferences.instance.isNetflixHotkeysEnabled).toBe(true)
    expect(Preferences.instance.isSlowSeekEnabled).toBe(true)
    expect(Preferences.instance.isPowerSkipEnabled).toBe(true)
    expect(Preferences.instance.isAutoLoginEnabled).toBe(true)
    expect(Preferences.instance.usernameList).toEqual(['a', 'b', 'c'])
    expect(Preferences.instance.defaultUsername).toBe('a')
    expect(Preferences.instance.profilePassword).toBe('b')
    expect(Preferences.instance.isStartNextEpisodeEnabled).toBe(true)
    expect(Preferences.instance.isStartOverEpisodeEnabled).toBe(true)
    expect(Preferences.instance.isSubtitleToggleEnabled).toBe(true)
    expect(Preferences.instance.isAudioToggleEnabled).toBe(true)
  })

  describe('should be able to set values to the chrome storage for', () => {
    it('isNetflixHotkeysEnabled', () => {
      Preferences.instance.isNetflixHotkeysEnabled = true
      expect(chrome.storage.local.set).toHaveBeenCalledWith({ isNetflixHotkeysEnabled: true })
    })

    it('isSlowSeekEnabled', () => {
      Preferences.instance.isSlowSeekEnabled = true
      expect(chrome.storage.local.set).toHaveBeenCalledWith({ isSlowSeekEnabled: true })
    })

    it('isPowerSkipEnabled', () => {
      Preferences.instance.isPowerSkipEnabled = true
      expect(chrome.storage.local.set).toHaveBeenCalledWith({ isPowerSkipEnabled: true })
    })

    it('isAutoLoginEnabled', () => {
      Preferences.instance.isAutoLoginEnabled = true
      expect(chrome.storage.local.set).toHaveBeenCalledWith({ isAutoLoginEnabled: true })
    })

    it('usernameList', () => {
      Preferences.instance.usernameList = ['a', 'b', 'c']
      expect(chrome.storage.local.set).toHaveBeenCalledWith({ usernameList: ['a', 'b', 'c'] })
    })

    it('defaultUsername', () => {
      Preferences.instance.defaultUsername = 'a'
      expect(chrome.storage.local.set).toHaveBeenCalledWith({ defaultUsername: 'a' })
    })

    it('profilePassword', () => {
      Preferences.instance.profilePassword = 'b'
      expect(chrome.storage.local.set).toHaveBeenCalledWith({ profilePassword: 'b' })
    })

    it('isStartNextEpisodeEnabled', () => {
      Preferences.instance.isStartNextEpisodeEnabled = true
      expect(chrome.storage.local.set).toHaveBeenCalledWith({ isStartNextEpisodeEnabled: true })
    })

    it('isStartOverEpisodeEnabled', () => {
      Preferences.instance.isStartOverEpisodeEnabled = true
      expect(chrome.storage.local.set).toHaveBeenCalledWith({ isStartOverEpisodeEnabled: true })
    })

    it('isSubtitleToggleEnabled', () => {
      Preferences.instance.isSubtitleToggleEnabled = true
      expect(chrome.storage.local.set).toHaveBeenCalledWith({ isSubtitleToggleEnabled: true })
    })

    it('isAudioToggleEnabled', () => {
      Preferences.instance.isAudioToggleEnabled = true
      expect(chrome.storage.local.set).toHaveBeenCalledWith({ isAudioToggleEnabled: true })
    })
  })

  it('should listen for changes to the chrome storage', () => {
    let addListenerCallback = undefined
    chrome.storage.onChanged.addListener.mockImplementation((callback) => {
      addListenerCallback = callback
    })

    Preferences.instance // Access once to build the storage

    const listener = jest.fn()
    Preferences.instance.on('isNetflixHotkeysEnabled', listener)

    expect(chrome.storage.onChanged.addListener).toHaveBeenCalledWith(expect.any(Function))
    expect(addListenerCallback).toBeDefined()

    expect(Preferences.instance.isNetflixHotkeysEnabled).toBe(false)
    expect(listener).not.toHaveBeenCalled()

    addListenerCallback({ isNetflixHotkeysEnabled: { newValue: true } })

    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('should not listen for changes to the chrome storage if listener is removed', () => {
    const listener = jest.fn()
    Preferences.instance.on('isNetflixHotkeysEnabled', listener)

    Preferences.instance.isNetflixHotkeysEnabled = true
    expect(listener).toHaveBeenCalledTimes(1)

    Preferences.instance.off('isNetflixHotkeysEnabled', listener)
    Preferences.instance.isNetflixHotkeysEnabled = false
    expect(listener).toHaveBeenCalledTimes(1)
  })
})
