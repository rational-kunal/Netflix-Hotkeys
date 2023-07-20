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

  if (controls.videoPlayer) {
    return Page.VIDEO_PLAYER
  }

  return Page.UNKNOWN
}

// Lazily loaded controls
let controls = {
  get page() {
    return guessPage()
  },

  /** @type {NodeListOf<HTMLElement>|null} */
  get profileNameEls() {
    return document.querySelectorAll('span.profile-name')
  },

  /** @type {HTMLElement|null} */
  get profilePasswordInput() {
    return document.querySelector("input[data-uia='pin-number-0']")
  },

  /** @type {HTMLElement|null} */
  get videoPlayer() {
    return document.querySelector("div[data-uia='watch-video']")
  },

  /** @type {HTMLElement|null} */
  get backSeekButton() {
    return document.querySelector("button[data-uia='control-back10']")
  },

  /** @type {HTMLElement|null} */
  get forwardSeekButton() {
    return document.querySelector("button[data-uia='control-forward10']")
  },

  /** @type {HTMLElement|null} */
  get skipIntroButton() {
    return document.querySelector("button[data-uia='player-skip-intro']")
  },

  /** @type {HTMLElement|null} */
  get skipRecapButton() {
    return document.querySelector("button[data-uia='player-skip-recap']")
  },

  /** @type {HTMLElement|null} */
  get skipToNextEpisodeButton() {
    return document.querySelector("button[data-uia='next-episode-seamless-button']")
  },

  /** @type {HTMLElement|null} */
  get nextEpisodeButton() {
    return document.querySelector("button[data-uia='control-next']")
  },

  /** @type {HTMLElement|null} */
  get timeline() {
    return document.querySelector("div[data-uia='timeline']")
  },

  /** @type {HTMLElement|null} */
  get controlAudioSubtitleButton() {
    return document.querySelector("button[data-uia='control-audio-subtitle']")
  },

  /** @type {HTMLElement|null} */
  get controlAudioSubtitleMenu() {
    return document.querySelector("div[data-uia='selector-audio-subtitle']")
  },

  /** @type {HTMLElement[]} */
  get englishAudioOption() {
    return document.querySelector("li[data-uia*='audio-item'][data-uia*='english' i]")
  },

  /** @type {HTMLElement|null} */
  get originalAudioOption() {
    return document.querySelector("li[data-uia*='audio-item'][data-uia*='original' i]")
  },

  /** @type {HTMLElement|null} */
  get selectedAudioOption() {
    return document.querySelector("li[data-uia*='audio-item-selected']")
  },

  /** @type {HTMLElement|null} */
  get englishSubtitleOption() {
    return document.querySelector("li[data-uia*='subtitle-item'][data-uia*='english' i]")
  },

  /** @type {HTMLElement|null} */
  get offSubtitleOption() {
    return document.querySelector("li[data-uia*='subtitle-item'][data-uia*='Off' i]")
  },

  /** @type {HTMLElement|null} */
  get selectedSubtitleOption() {
    return document.querySelector("li[data-uia*='subtitle-item-selected']")
  },

  /** @type {HTMLElement|null} */
  get speedControlButton() {
    return document.querySelector("button[data-uia='control-speed']")
  },

  /** @type {HTMLElement|null} */
  get speedControlMenu() {
    return document.querySelector("div[data-uia='playback-speed']")
  },

  /** @type {HTMLElement[]} */
  get speedControlOptions() {
    return Array.from(document.querySelectorAll("div[data-uia*='playback-speed-item']"))
  },

  /** @type {HTMLElement|null} */
  get slowestSpeedOption() {
    return this.speedControlOptions[0]
  },

  /** @type {HTMLElement|null} */
  get normalSpeedOption() {
    return this.speedControlOptions.at(Math.floor(this.speedControlOptions.length / 2))
  },

  /** @type {HTMLElement|null} */
  get fastestSpeedOption() {
    return this.speedControlOptions.at(this.speedControlOptions.length - 1)
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
