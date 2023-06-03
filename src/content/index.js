import NetflixController from '../core/NetflixController'
import { preferences } from '../core/Preferences'

/**
 * Takes action on the user input
 * @param {KeyboardEvent} event
 */
function onUserInput(event) {
  if (event.key === 'a') {
    NetflixController.seekBackward()
  } else if (event.key === 'd') {
    NetflixController.seekForward()
  } else if (event.key === 'n') {
    NetflixController.jumpToNextEpisode()
  } else if (event.key === 'r') {
    NetflixController.startOverEpisode()
  }
}

preferences.on('isNetflixHotkeysEnabled', () => {
  document.removeEventListener('keydown', onUserInput)
  NetflixController.stop()

  if (preferences.isNetflixHotkeysEnabled) {
    document.addEventListener('keydown', onUserInput)
    NetflixController.start()
  } else {
    document.removeEventListener('keydown', onUserInput)
    NetflixController.stop()
  }
})

export {}
