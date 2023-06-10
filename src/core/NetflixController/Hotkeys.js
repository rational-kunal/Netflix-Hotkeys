import NetflixCrawler from '../NetflixCrawler'
import Executor from './Executor'

/**
 * Toggles subtitle between english and off.
 *
 * The function will do the following:
 * 1. Click on the audio/subtitle button to open the menu.
 * 2. Click on the subtitle to select it.
 * 3. Close the menu.
 */
function toggleSubtitle() {
  Executor.executeOrAddToQueue(() => {
    if (!NetflixCrawler.controls.controlAudioSubtitleButton) {
      return false
    }

    // 1. Click on the audio/subtitle button to open the menu.
    NetflixCrawler.controls.controlAudioSubtitleButton.click()

    Executor.executeOrAddToQueue(() => {
      console.assert(
        NetflixCrawler.controls.controlAudioSubtitleMenu,
        '[🎹] [Audio/Subtitle] Audio/Subtitle menu not opened',
      )

      // 2. Click on the subtitle to select it.
      if (!NetflixCrawler.controls.controlAudioSubtitleMenu) {
        return false
      }

      if (NetflixCrawler.controls.selectedSubtitleOption === NetflixCrawler.controls.englishSubtitleOption) {
        NetflixCrawler.controls.offSubtitleOption.click()
        console.debug('[🎹] [Audio/Subtitle] selected off subtitle')
      } else {
        NetflixCrawler.controls.englishSubtitleOption.click()
        console.debug('[🎹] [Audio/Subtitle] selected english subtitle')
      }

      // 3. Close the menu.
      _closeAudioSubtitleMenu()

      return true
    })

    return true
  })
}

/**
 * Toggle audio between original and english
 *
 * The function will do the following:
 * 1. Click on the audio/subtitle button to open the menu.
 * 2. Click on the audio option to select it.
 * 3. Close the menu.
 */
function toggleAudio() {
  Executor.executeOrAddToQueue(() => {
    if (!NetflixCrawler.controls.controlAudioSubtitleButton) {
      return false
    }

    // 1. Click on the audio/subtitle button to open the menu.
    NetflixCrawler.controls.controlAudioSubtitleButton.click()

    Executor.executeOrAddToQueue(() => {
      console.assert(
        NetflixCrawler.controls.controlAudioSubtitleMenu,
        '[🎹] [Audio/Subtitle] Audio/Subtitle menu not opened',
      )

      // 2. Click on the audio option to select it.
      if (!NetflixCrawler.controls.controlAudioSubtitleMenu) {
        return false
      }

      if (NetflixCrawler.controls.selectedAudioOption === NetflixCrawler.controls.englishAudioOption) {
        NetflixCrawler.controls.originalAudioOption.click()
        console.debug('[🎹] [Audio/Subtitle] selected original audio')
      } else {
        NetflixCrawler.controls.englishAudioOption.click()
        console.debug('[🎹] [Audio/Subtitle] selected english audio')
      }

      // 3. Close the menu.
      _closeAudioSubtitleMenu()

      return true
    })

    return true
  })
}

function _closeAudioSubtitleMenu() {
  // Escape key to dismiss the menu
  const keyDownEvent = new KeyboardEvent('keydown', {
    bubbles: true,
    cancelable: true,
    view: window,
    key: 'Escape',
    keyCode: 27,
  })
  NetflixCrawler.controls.controlAudioSubtitleMenu.dispatchEvent(keyDownEvent)

  // Mouse move from the audio/subtitle option to dismiss the active state of the button
  const mouseMoveEvent = new MouseEvent('mousemove', {
    bubbles: true,
    cancelable: true,
    view: window,
    clientX: 0,
    clientY: 0,
  })
  NetflixCrawler.controls.controlAudioSubtitleButton.dispatchEvent(mouseMoveEvent)
}

export default {
  toggleSubtitle,
  toggleAudio,
}
