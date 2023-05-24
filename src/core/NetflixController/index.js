import preferences from '../Preferences'

let buttons = {
  /** @type {HTMLButtonElement|undefined} */
  backSeek: undefined,

  /** @type {HTMLButtonElement|undefined} */
  forwardSeek: undefined,

  /** @type {HTMLButtonElement|undefined} */
  skipIntro: undefined,

  /** @type {HTMLButtonElement|undefined} */
  skipToNextEpisode: undefined,
}

let netflixObserver = new MutationObserver(() => {
  if (preferences.isNetflixHotkeysEnabled) {
    buttons.backSeek = document.querySelectorAll("button[data-uia='control-back10']")[0]
    buttons.forwardSeek = document.querySelectorAll("button[data-uia='control-forward10']")[0]
    buttons.skipIntro = document.querySelectorAll("button[data-uia='player-skip-intro']")[0]
    buttons.skipToNextEpisode = document.querySelectorAll(
      "button[data-uia='next-episode-seamless-button']",
    )[0]

    if (preferences.isPowerSkipEnabled) {
      buttons.skipIntro?.click()
      buttons.skipToNextEpisode?.click()
    }
  }
})

function start() {
  netflixObserver.observe(document.documentElement || document.body, {
    childList: true,
    subtree: true,
  })
}

// TODO: Listen to preference change for netflix hotkeys enabled / disabled and start / stop accordingly

function seekForward() {
  buttons.forwardSeek?.click()
}

function seekBackward() {
  buttons.backSeek?.click()
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
  seekForward: callIfNetflixHotkeysEnabled(seekForward),
  seekBackward: callIfNetflixHotkeysEnabled(seekBackward),
}
