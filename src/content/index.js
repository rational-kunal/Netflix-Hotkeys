import NetflixController from '../core/NetflixController'
import { Preferences } from '../core/Preferences'

/**
 * Takes action on the user input
 * @param {KeyboardEvent} event
 */
function onUserInput(event) {
  if (event.key === 'a') {
    if (event.type === 'keydown' && event.repeat === false) {
      NetflixController.playSlowest()
    } else if (event.type === 'keyup') {
      NetflixController.playNormal()
    }
  } else if (event.key === 'd') {
    if (event.type === 'keydown' && event.repeat === false) {
      NetflixController.playFastest()
    } else if (event.type === 'keyup') {
      NetflixController.playNormal()
    }
  } else if (event.key === 'n' && event.type === 'keydown') {
    NetflixController.jumpToNextEpisode()
  } else if (event.key === 'r' && event.type === 'keydown') {
    NetflixController.startOverEpisode()
  } else if (event.key === 'v' && event.type === 'keydown') {
    NetflixController.toggleAudio()
  } else if (event.key === 'c' && event.type === 'keydown') {
    NetflixController.toggleSubtitle()
  }
}

Preferences.instance.on('isNetflixHotkeysEnabled', () => {
  document.removeEventListener('keydown', onUserInput)
  document.removeEventListener('keyup', onUserInput)
  NetflixController.stop()

  if (Preferences.instance.isNetflixHotkeysEnabled) {
    document.addEventListener('keydown', onUserInput)
    document.addEventListener('keyup', onUserInput)
    NetflixController.start()
  }
})

export {}
