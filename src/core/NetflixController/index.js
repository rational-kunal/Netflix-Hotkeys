import preferences from '../Preferences'

const Page = Object.freeze({
  USER_SELECTION: 'USER_SELECTION',
  PASSWORD_INPUT: 'PASSWORD_INPUT',
  PASSWORD_INPUT_WRONG: 'PASSWORD_INPUT_WRONG',
  VIDEO_PLAYER: 'VIDEO_PLAYER',
})

let buttons = {
  /** @type {HTMLButtonElement|undefined} */
  backSeek: undefined,

  /** @type {HTMLButtonElement|undefined} */
  forwardSeek: undefined,

  /** @type {HTMLButtonElement|undefined} */
  skipIntro: undefined,

  /** @type {HTMLButtonElement|undefined} */
  skipToNextEpisode: undefined,

  /** @type {HTMLButtonElement|undefined} */
  nextEpisode: undefined,
}

// TODO: Create a Netflix Crawler
const guessPage = () => {
  const firstHeader = document.getElementsByTagName('h1')[0]?.innerText
  if (firstHeader === "Who's watching?") {
    return Page.USER_SELECTION
  }

  if (firstHeader === 'Enter your PIN to access this profile.') {
    return Page.PASSWORD_INPUT
  }

  if (firstHeader === 'Whoops, wrong PIN. Please try again.') {
    return Page.PASSWORD_INPUT_WRONG
  }

  return Page.VIDEO_PLAYER
}

/**
 * User Selection Observer
 * Observes the user selection page and selects the default user if auto login is enabled.
 */
const userSelectionPageObserver = () => {
  const usernameEls = document.querySelectorAll('span.profile-name')
  let defaultUsernameEl = undefined
  const usernames = []
  for (const usernameEl of usernameEls) {
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

  const inputNumber1 = document.querySelectorAll("input[data-uia='pin-number-0']")[0]

  const clipboardData = new DataTransfer()
  clipboardData.setData('text/plain', password)
  inputNumber1.dispatchEvent(
    new ClipboardEvent('paste', { clipboardData: clipboardData, bubbles: true }),
  )
}

/**
 * Video Player Observer
 * Observes the video player page and skips intro and auto plays next episode if auto skip is enabled.
 * Also, stores the reference to the buttons for seeking forward and backward.
 */
const videoPlayerPageObserver = () => {
  buttons.backSeek = document.querySelectorAll("button[data-uia='control-back10']")[0]
  buttons.forwardSeek = document.querySelectorAll("button[data-uia='control-forward10']")[0]
  buttons.skipIntro = document.querySelectorAll("button[data-uia='player-skip-intro']")[0]
  buttons.skipToNextEpisode = document.querySelectorAll(
    "button[data-uia='next-episode-seamless-button']",
  )[0]
  buttons.nextEpisode = document.querySelectorAll("button[data-uia='control-next']")[0]

  if (preferences.isPowerSkipEnabled) {
    buttons.skipIntro?.click()
    buttons.skipToNextEpisode?.click()
  }
}

const mainObserver = () => {
  console.info('[🕸️] Netflix Hotkeys: Main Observer triggered')
  const page = guessPage()
  switch (page) {
    case Page.USER_SELECTION:
      userSelectionPageObserver()
      break
    case Page.PASSWORD_INPUT:
      passwordInputPageObserver()
      break
    case Page.PASSWORD_INPUT_WRONG:
      // Either the default password is wrong or user entered wrong password
      break
    case Page.VIDEO_PLAYER:
      videoPlayerPageObserver()
      break
  }
}

const netflixObserver = new MutationObserver(mainObserver)

function start() {
  netflixObserver.observe(document.documentElement || document.body, {
    childList: true,
    subtree: true,
  })
}

function stop() {
  netflixObserver.disconnect()
}

// TODO: Listen to preference change for netflix hotkeys enabled / disabled and start / stop accordingly

function seekForward() {
  buttons.forwardSeek?.click()
}

function seekBackward() {
  buttons.backSeek?.click()
}

function jumpToNextEpisode() {
  if (preferences.isNextEpisodeHotkeyEnabled) {
    buttons.nextEpisode?.click()
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
