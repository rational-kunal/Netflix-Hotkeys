import { Storage } from '../Storage'

class Preferences extends Storage {
  /**
   * For auto-completion and intellisense.
   * @type {Preferences}
   */
  static get instance() {
    return super.instance
  }

  /** Build the instance early on so that the initial values are set correctly. */
  static {
    Preferences.instance
  }

  /**
   * Whether the Netflix Hotkeys extension is enabled.
   * @type {boolean}
   */
  isNetflixHotkeysEnabled = this.field({ fallback: false })

  /**
   * Whether A/D to seek is enabled.
   * @type {boolean}
   * @deprecated
   */
  isSlowSeekEnabled = this.field({ fallback: false })

  /**
   * Whether power seek is enabled.
   *  - D to play with 1.5x speed.
   *  - A to play with 0.5x speed.
   * @type {boolean}
   */
  isPowerSeekEnabled = this.field({ fallback: false })

  /**
   * Whether power skip (intro, recap and end credits) is enabled.
   * @type {boolean}
   */
  isPowerSkipEnabled = this.field({ fallback: false })

  /**
   * Whether automatically login to profile is enabled.
   * @type {boolean}
   */
  isAutoLoginEnabled = this.field({ fallback: false })

  /**
   * Usernames of the profiles.
   * @type {String[]}
   */
  usernameList = this.field({ fallback: [] })

  /**
   * Default username of the profile to login.
   * @type {String}
   */
  defaultUsername = this.field({ fallback: '' })

  /**
   * Profile password of the default username.
   * @type {String}
   */
  profilePassword = this.field({ fallback: '' })

  /**
   * Whether N to next episode is enabled.
   * @type {boolean}
   */
  isStartNextEpisodeEnabled = this.field({ fallback: false })

  /**
   * Whether R to start over the episode is enabled.
   * @type {boolean}
   */
  isStartOverEpisodeEnabled = this.field({ fallback: false })

  /**
   * Whether C to toggle subtitle is enabled.
   * Toggle between English and Off.
   * @type {boolean}
   */
  isSubtitleToggleEnabled = this.field({ fallback: false })

  /**
   * Whether V to toggle audio is enabled.
   * Toggle between English and Original.
   * @type {boolean}
   */
  isAudioToggleEnabled = this.field({ fallback: false })
}

export default Preferences
