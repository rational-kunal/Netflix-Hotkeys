import preferences, { Preferences } from './Preferences'
import { jest } from '@jest/globals'
import { chrome } from '../../testing/ChromeMock'

describe('Preferences', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('should be able to build with initial value of', () => {
    const preferences = new Preferences()
    preferences.build()

    it('isNetflixHotkeysEnabled as false', () => {
      expect(preferences.isNetflixHotkeysEnabled).toBe(false)
    })

    it('isSlowSeekEnabled as false', () => {
      expect(preferences.isSlowSeekEnabled).toBe(false)
    })

    it('isPowerSkipEnabled as false', () => {
      expect(preferences.isPowerSkipEnabled).toBe(false)
    })

    it('isAutoLoginEnabled as false', () => {
      expect(preferences.isAutoLoginEnabled).toBe(false)
    })

    it('usernameList as empty array', () => {
      expect(preferences.usernameList).toEqual([])
    })

    it('defaultUsername as empty string', () => {
      expect(preferences.defaultUsername).toBe('')
    })

    it('profilePassword as empty string', () => {
      expect(preferences.profilePassword).toBe('')
    })

    it('isStartNextEpisodeEnabled as false', () => {
      expect(preferences.isStartNextEpisodeEnabled).toBe(false)
    })

    it('isStartOverEpisodeEnabled as false', () => {
      expect(preferences.isStartOverEpisodeEnabled).toBe(false)
    })
  })

  describe('should be able to set and get values of', () => {
    const preferences = new Preferences()
    preferences.build()

    it('isNetflixHotkeysEnabled', () => {
      preferences.isNetflixHotkeysEnabled = true
      expect(preferences.isNetflixHotkeysEnabled).toBe(true)
    })

    it('isSlowSeekEnabled', () => {
      preferences.isSlowSeekEnabled = true
      expect(preferences.isSlowSeekEnabled).toBe(true)
    })

    it('isPowerSkipEnabled', () => {
      preferences.isPowerSkipEnabled = true
      expect(preferences.isPowerSkipEnabled).toBe(true)
    })

    it('isAutoLoginEnabled', () => {
      preferences.isAutoLoginEnabled = true
      expect(preferences.isAutoLoginEnabled).toBe(true)
    })

    it('usernameList', () => {
      preferences.usernameList = ['a', 'b', 'c']
      expect(preferences.usernameList).toEqual(['a', 'b', 'c'])
    })

    it('defaultUsername', () => {
      preferences.defaultUsername = 'a'
      expect(preferences.defaultUsername).toBe('a')
    })

    it('profilePassword', () => {
      preferences.profilePassword = 'b'
      expect(preferences.profilePassword).toBe('b')
    })

    it('isStartNextEpisodeEnabled', () => {
      preferences.isStartNextEpisodeEnabled = true
      expect(preferences.isStartNextEpisodeEnabled).toBe(true)
    })

    it('isStartOverEpisodeEnabled', () => {
      preferences.isStartOverEpisodeEnabled = true
      expect(preferences.isStartOverEpisodeEnabled).toBe(true)
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
      })
    })

    const preferences = new Preferences()
    preferences.build()

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
      ],
      expect.any(Function),
    )

    expect(preferences.isNetflixHotkeysEnabled).toBe(true)
    expect(preferences.isSlowSeekEnabled).toBe(true)
    expect(preferences.isPowerSkipEnabled).toBe(true)
    expect(preferences.isAutoLoginEnabled).toBe(true)
    expect(preferences.usernameList).toEqual(['a', 'b', 'c'])
    expect(preferences.defaultUsername).toBe('a')
    expect(preferences.profilePassword).toBe('b')
    expect(preferences.isStartNextEpisodeEnabled).toBe(true)
    expect(preferences.isStartOverEpisodeEnabled).toBe(true)
  })

  describe('should be able to set values to the chrome storage for', () => {
    const preferences = new Preferences()
    preferences.build()

    it('isNetflixHotkeysEnabled', () => {
      preferences.isNetflixHotkeysEnabled = true
      expect(chrome.storage.local.set).toHaveBeenCalledWith({ isNetflixHotkeysEnabled: true })
    })

    it('isSlowSeekEnabled', () => {
      preferences.isSlowSeekEnabled = true
      expect(chrome.storage.local.set).toHaveBeenCalledWith({ isSlowSeekEnabled: true })
    })

    it('isPowerSkipEnabled', () => {
      preferences.isPowerSkipEnabled = true
      expect(chrome.storage.local.set).toHaveBeenCalledWith({ isPowerSkipEnabled: true })
    })

    it('isAutoLoginEnabled', () => {
      preferences.isAutoLoginEnabled = true
      expect(chrome.storage.local.set).toHaveBeenCalledWith({ isAutoLoginEnabled: true })
    })

    it('usernameList', () => {
      preferences.usernameList = ['a', 'b', 'c']
      expect(chrome.storage.local.set).toHaveBeenCalledWith({ usernameList: ['a', 'b', 'c'] })
    })

    it('defaultUsername', () => {
      preferences.defaultUsername = 'a'
      expect(chrome.storage.local.set).toHaveBeenCalledWith({ defaultUsername: 'a' })
    })

    it('profilePassword', () => {
      preferences.profilePassword = 'b'
      expect(chrome.storage.local.set).toHaveBeenCalledWith({ profilePassword: 'b' })
    })

    it('isStartNextEpisodeEnabled', () => {
      preferences.isStartNextEpisodeEnabled = true
      expect(chrome.storage.local.set).toHaveBeenCalledWith({ isStartNextEpisodeEnabled: true })
    })

    it('isStartOverEpisodeEnabled', () => {
      preferences.isStartOverEpisodeEnabled = true
      expect(chrome.storage.local.set).toHaveBeenCalledWith({ isStartOverEpisodeEnabled: true })
    })
  })

  it('should listen for changes to the chrome storage', () => {
    let addListenerCallback = undefined
    chrome.storage.onChanged.addListener.mockImplementation((callback) => {
      addListenerCallback = callback
    })

    const preferences = new Preferences()
    preferences.build()

    const listener = jest.fn()
    preferences.on('isNetflixHotkeysEnabled', listener)

    expect(chrome.storage.onChanged.addListener).toHaveBeenCalledWith(expect.any(Function))
    expect(addListenerCallback).toBeDefined()

    expect(preferences.isNetflixHotkeysEnabled).toBe(false)
    expect(listener).not.toHaveBeenCalled()

    addListenerCallback({ isNetflixHotkeysEnabled: { newValue: true } })

    expect(listener).toHaveBeenCalledTimes(1)
  })
})

describe('The preferences instance', () => {
  it('should be able to set and get values', () => {
    preferences.isNetflixHotkeysEnabled = true
    preferences.isSlowSeekEnabled = true
    preferences.isPowerSkipEnabled = true
    preferences.isAutoLoginEnabled = true
    preferences.usernameList = ['a', 'b', 'c']
    preferences.defaultUsername = 'a'
    preferences.profilePassword = 'b'
    preferences.isStartNextEpisodeEnabled = true
    preferences.isStartOverEpisodeEnabled = true

    expect(preferences.isNetflixHotkeysEnabled).toBe(true)
    expect(preferences.isSlowSeekEnabled).toBe(true)
    expect(preferences.isPowerSkipEnabled).toBe(true)
    expect(preferences.isAutoLoginEnabled).toBe(true)
    expect(preferences.usernameList).toEqual(['a', 'b', 'c'])
    expect(preferences.defaultUsername).toBe('a')
    expect(preferences.profilePassword).toBe('b')
    expect(preferences.isStartNextEpisodeEnabled).toBe(true)
    expect(preferences.isStartOverEpisodeEnabled).toBe(true)

    expect(chrome.storage.local.set).toHaveBeenCalledTimes(9)
  })
})
