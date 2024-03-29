import { Preferences } from '../Preferences'
import NetflixCrawler, { Page } from '../NetflixCrawler'
import Executor from './Executor'
import Hotkeys from './Hotkeys'

/**
 * User Selection Observer
 * Observes the user selection page and selects the default user if auto login is enabled.
 */
const userSelectionPageObserver = () => {
  if (!Preferences.instance.isAutoLoginEnabled) {
    return
  }

  let defaultUsernameEl = undefined
  const usernames = []
  for (const usernameEl of NetflixCrawler.controls.profileNameEls) {
    usernames.push(usernameEl.innerText)
    if (usernameEl.innerText === Preferences.instance.defaultUsername) {
      defaultUsernameEl = usernameEl
    }
  }

  Preferences.instance.usernameList = usernames
  defaultUsernameEl?.click()
}

/**
 * Password Input Observer
 * Observes the password input page and enters the default password if auto login is enabled.
 * Detail: Copy pastes the password to the first input field.
 */
const passwordInputPageObserver = () => {
  if (!Preferences.instance.isAutoLoginEnabled) {
    return
  }

  const password = Preferences.instance.profilePassword
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
  Hotkeys.insertContentToastManager()

  if (Preferences.instance.isPowerSkipEnabled) {
    NetflixCrawler.controls.skipIntroButton?.click()
    NetflixCrawler.controls.skipRecapButton?.click()
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
  if (!Preferences.instance.isSlowSeekEnabled) {
    return
  }

  Executor.executeOrAddToQueue(() => {
    return clickIfButtonExists(NetflixCrawler.controls.forwardSeekButton)
  })
}

function seekBackward() {
  if (!Preferences.instance.isSlowSeekEnabled) {
    return
  }

  Executor.executeOrAddToQueue(() => {
    return clickIfButtonExists(NetflixCrawler.controls.backSeekButton)
  })
}

function jumpToNextEpisode() {
  if (!Preferences.instance.isStartNextEpisodeEnabled) {
    return
  }
  Executor.executeOrAddToQueue(() => {
    return clickIfButtonExists(NetflixCrawler.controls.nextEpisodeButton)
  })
}

function startOverEpisode() {
  if (!Preferences.instance.isStartOverEpisodeEnabled) {
    return
  }

  Executor.executeOrAddToQueue(() => {
    if (!NetflixCrawler.controls.timeline) {
      return false
    }

    // After much debugging and looking through all things like "chrome.debugger" and "puppeteer" following logic was found to work.
    // For some weird reason we need to dispatch both mouse down and mouse up events to seek to the beginning of the episode.
    // NOTE: This has more probability of breaking in future.
    const timelineRect = NetflixCrawler.controls.timeline.getBoundingClientRect()
    const x = timelineRect.left
    const y = timelineRect.top + timelineRect.height * 0.5

    NetflixCrawler.controls.timeline.dispatchEvent(
      new MouseEvent('mousedown', {
        clientX: x,
        clientY: y,
        bubbles: true,
      }),
    )

    NetflixCrawler.controls.timeline.dispatchEvent(
      new MouseEvent('mouseup', {
        clientX: x,
        clientY: y,
        bubbles: true,
      }),
    )

    return true
  })
}

function toggleSubtitle() {
  if (Preferences.instance.isSubtitleToggleEnabled) {
    Hotkeys.toggleSubtitle()
  }
}

function toggleAudio() {
  if (Preferences.instance.isAudioToggleEnabled) {
    Hotkeys.toggleAudio()
  }
}

function playFastest() {
  if (!Preferences.instance.isPowerSeekEnabled) {
    return
  }

  Hotkeys.playFastest()
}

function playNormal() {
  if (!Preferences.instance.isPowerSeekEnabled) {
    return
  }

  Hotkeys.playNormal()
}

function playSlowest() {
  if (!Preferences.instance.isPowerSeekEnabled) {
    return
  }

  Hotkeys.playSlowest()
}

function callIfNetflixHotkeysEnabled(func) {
  return () => {
    if (Preferences.instance.isNetflixHotkeysEnabled) {
      func()
    }
  }
}

function clickIfButtonExists(button) {
  if (button) {
    button.click()
    return true
  }
  return false
}

export default {
  start,
  stop,
  seekForward: callIfNetflixHotkeysEnabled(seekForward),
  seekBackward: callIfNetflixHotkeysEnabled(seekBackward),
  jumpToNextEpisode: callIfNetflixHotkeysEnabled(jumpToNextEpisode),
  startOverEpisode: callIfNetflixHotkeysEnabled(startOverEpisode),
  toggleSubtitle: callIfNetflixHotkeysEnabled(toggleSubtitle),
  toggleAudio: callIfNetflixHotkeysEnabled(toggleAudio),
  playFastest: callIfNetflixHotkeysEnabled(playFastest),
  playNormal: callIfNetflixHotkeysEnabled(playNormal),
  playSlowest: callIfNetflixHotkeysEnabled(playSlowest),
}
