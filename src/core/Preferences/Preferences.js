import { Storage } from '../Storage'

class Preferences extends Storage {
  /**
   * Whether the Netflix Hotkeys extension is enabled.
   * @type {boolean}
   */
  isNetflixHotkeysEnabled = this.field(false)

  /**
   * Whether A/D to seek is enabled.
   * @type {boolean}
   */
  isSlowSeekEnabled = this.field(false)

  /**
   * Whether power skip (intro and outro) is enabled.
   * @type {boolean}
   */
  isPowerSkipEnabled = this.field(false)

  /**
   * Whether automatically login to profile is enabled.
   * @type {boolean}
   */
  isAutoLoginEnabled = this.field(false)

  /**
   * Usernames of the profiles.
   * @type {String[]}
   */
  usernameList = this.field([])

  /**
   * Default username of the profile to login.
   * @type {String}
   */
  defaultUsername = this.field('')

  /**
   * Profile password of the default username.
   * @type {String}
   */
  profilePassword = this.field('')

  /**
   * Whether N to next episode is enabled.
   * @type {boolean}
   */
  isStartNextEpisodeEnabled = this.field(false)

  /**
   * Whether R to start over the episode is enabled.
   * @type {boolean}
   */
  isStartOverEpisodeEnabled = this.field(false)
}

const preferences = new Preferences()
preferences.build()
export default preferences

export { Preferences } // Exporting the Class for testing
