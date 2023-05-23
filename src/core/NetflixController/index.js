import preferences from '../Preferences'

let buttons = {
  /** @type {HTMLButtonElement|undefined} */
  backSeek: undefined,

  /** @type {HTMLButtonElement|undefined} */
  forwardSeek: undefined,
}

let netflixObserver = new MutationObserver(() => {
  if (preferences.isNetflixHotkeysEnabled) {
    buttons.backSeek = document.querySelectorAll("button[data-uia='control-back10']")[0]
    buttons.forwardSeek = document.querySelectorAll("button[data-uia='control-forward10']")[0]
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
