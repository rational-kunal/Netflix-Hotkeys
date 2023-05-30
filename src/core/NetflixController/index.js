import preferences from '../Preferences'
import NetflixCrawler, {Page} from '../NetflixCrawler'

/**
 * User Selection Observer
 * Observes the user selection page and selects the default user if auto login is enabled.
 */
const userSelectionPageObserver = () => {
  let defaultUsernameEl = undefined
  const usernames = []
  for (const usernameEl of NetflixCrawler.controls.profileNameEls) {
    usernames.push(usernameEl.innerText)
    if (usernameEl.innerText === preferences.defaultUsername) {
      defaultUsernameEl = usernameEl
    }
  }

  preferences.usernameList = usernames
  defaultUsernameEl?.click()
}

/**
 * Password Input Observer
 * Observes the password input page and enters the default password if auto login is enabled.
 * Detail: Copy pastes the password to the first input field.
 */
const passwordInputPageObserver = () => {
  const password = preferences.profilePassword
  if (!password && password.length !== 4 && isNaN(password)) {
    return
  }

  const clipboardData = new DataTransfer()
  clipboardData.setData('text/plain', password)
  NetflixCrawler.controls.profilePasswordInput.dispatchEvent(
    new ClipboardEvent('paste', { clipboardData: clipboardData, bubbles: true }),
  )
}

/**
 * Video Player Observer
 * Observes the video player page and skips intro and auto plays next episode if auto skip is enabled.
 * Also, stores the reference to the buttons for seeking forward and backward.
 */
const videoPlayerPageObserver = () => {
  if (preferences.isPowerSkipEnabled) {
    NetflixCrawler.controls.skipIntroButton?.click()
    NetflixCrawler.controls.skipToNextEpisodeButton?.click()
  }
}

NetflixCrawler.addChangeListener(() => {
  const page = NetflixCrawler.controls.page
  if (page === Page.USER_SELECTION) {
    userSelectionPageObserver()
  } else if (page === Page.PASSWORD_INPUT) {
    passwordInputPageObserver()
  } else if (page === Page.VIDEO_PLAYER) {
    videoPlayerPageObserver()
  }
})

function start() {
  NetflixCrawler.start()
}

function stop() {
  NetflixCrawler.stop()
}

function seekForward() {
  NetflixCrawler.controls.forwardSeekButton?.click()
}

function seekBackward() {
  NetflixCrawler.controls.backSeekButton?.click()
}

function jumpToNextEpisode() {
  if (preferences.isNextEpisodeHotkeyEnabled) {
    NetflixCrawler.controls.nextEpisodeButton?.click()
  }
}

function callIfNetflixHotkeysEnabled(func) {
  return () => {
    if (preferences.isNetflixHotkeysEnabled) {
      func()
    }
  }
}

export default {
  start,
  stop,
  seekForward: callIfNetflixHotkeysEnabled(seekForward),
  seekBackward: callIfNetflixHotkeysEnabled(seekBackward),
  jumpToNextEpisode: callIfNetflixHotkeysEnabled(jumpToNextEpisode),
}
