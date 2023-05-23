import NetflixController from '../core/NetflixController'

NetflixController.start()

// Listen to events from user and act accordingly
document.addEventListener('keydown', (event) => {
  if (event.key === 'a') {
    NetflixController.seekBackward()
  } else if (event.key === 'd') {
    NetflixController.seekForward()
  }
})

export {}
