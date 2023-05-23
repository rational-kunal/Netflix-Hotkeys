const NETFLIX_HOTKEYS_ENABLED_KEY = 'NETFLIX_HOTKEYS_ENABLED'
const SKIP_INTRO_ENABLED_KEY = 'SKIP_INTRO_ENABLED'

let _isNetflixHotkeysEnabled = false
let _isSkipIntroEnabled = false
class Preferences {
  /**
   * Whether user has opted to enable Netflix hotkeys extension. In short this is a overall switch.
   * @type {boolean}
   */
  get isNetflixHotkeysEnabled() {
    return _isNetflixHotkeysEnabled
  }
  set isNetflixHotkeysEnabled(value) {
    _isNetflixHotkeysEnabled = value
    chrome.storage.local.set({ [NETFLIX_HOTKEYS_ENABLED_KEY]: value })
  }

  /**
   * Whether user has opted to enable skip intro feature.
   * @type {boolean}
   */
  get isSkipIntroEnabled() {
    return _isSkipIntroEnabled
  }
  set isSkipIntroEnabled(value) {
    _isSkipIntroEnabled = value
    chrome.storage.local.set({ [SKIP_INTRO_ENABLED_KEY]: value })
  }
}

let preferences = new Preferences()

// Initially load all preferences
chrome.storage.local.get([NETFLIX_HOTKEYS_ENABLED_KEY, SKIP_INTRO_ENABLED_KEY], (result) => {
  _isNetflixHotkeysEnabled = result[NETFLIX_HOTKEYS_ENABLED_KEY]
  _isSkipIntroEnabled = result[SKIP_INTRO_ENABLED_KEY]
})

// Listen for changes to preferences
chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let key in changes) {
    if (key === NETFLIX_HOTKEYS_ENABLED_KEY) {
      _isNetflixHotkeysEnabled = changes[key].newValue
    } else if (key === SKIP_INTRO_ENABLED_KEY) {
      _isSkipIntroEnabled = changes[key].newValue
    }
  }
})

export default preferences
