const Page = Object.freeze({
  USER_SELECTION: 'USER_SELECTION',
  PASSWORD_INPUT: 'PASSWORD_INPUT',
  PASSWORD_INPUT_WRONG: 'PASSWORD_INPUT_WRONG',
  VIDEO_PLAYER: 'VIDEO_PLAYER',
  UNKNOWN: 'UNKNOWN',
})

const mainObserver = () => {
  console.info('[🕸️] Netflix Crawler: Main Observer triggered')
  _callListeners()
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

/** @type {function[]} */
const _changeListeners = []

/**
 * Calls the callback when the netflix changes DOM.
 * @param {function} callback
 */
function addChangeListener(callback) {
  _changeListeners.push(callback)
}

function _callListeners() {
  for (const listener of _changeListeners) {
    listener()
  }
}

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

  if (document.querySelector("div[data-uia='watch-video']")) {
    return Page.VIDEO_PLAYER
  }

  return Page.UNKNOWN
}

// Lazily loaded controls
let controls = {
  get page() {
    return guessPage()
  },

  /** @type {NodeListOf<HTMLElement>|undefined} */
  get profileNameEls() {
    return document.querySelectorAll('span.profile-name')
  },

  /** @type {HTMLElement|undefined} */
  get profilePasswordInput() {
    return document.querySelector("input[data-uia='pin-number-0']")
  },

  /** @type {HTMLElement|undefined} */
  get backSeekButton() {
    return document.querySelector("button[data-uia='control-back10']")
  },

  /** @type {HTMLElement|undefined} */
  get forwardSeekButton() {
    return document.querySelector("button[data-uia='control-forward10']")
  },

  /** @type {HTMLElement|undefined} */
  get skipIntroButton() {
    return document.querySelector("button[data-uia='player-skip-intro']")
  },

  /** @type {HTMLElement|undefined} */
  get skipToNextEpisodeButton() {
    return document.querySelector("button[data-uia='next-episode-seamless-button']")
  },

  /** @type {HTMLElement|undefined} */
  get nextEpisodeButton() {
    return document.querySelector("button[data-uia='control-next']")
  },
}

export default {
  Page,
  start,
  stop,
  addChangeListener,
  controls,
}

export { Page }
