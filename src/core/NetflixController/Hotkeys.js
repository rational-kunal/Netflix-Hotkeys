import { createRoot } from 'react-dom/client'
import { HotkeysEvent, HotkeysEventType, eventManager } from '../EventManager'
import NetflixCrawler from '../NetflixCrawler'
import Executor from './Executor'
import { insertContentToastManagerToRoot } from '../../UI/ContentToastManager'

const ROOT_NODE_ID = 'content-toast-manager-root'

/**
 * Insert Content Toast Manager to the DOM if needed.
 */
function insertContentToastManager() {
  const isVideoPlayerPage = NetflixCrawler.controls.page === NetflixCrawler.Page.VIDEO_PLAYER
  const isContentToastManagerInserted = document.getElementById(ROOT_NODE_ID)
  if (!isVideoPlayerPage || isContentToastManagerInserted) {
    return
  }

  const rootDiv = document.createElement('div')
  rootDiv.id = ROOT_NODE_ID

  const root = createRoot(rootDiv)
  insertContentToastManagerToRoot(root)

  NetflixCrawler.controls.videoPlayer.appendChild(rootDiv)
}

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
      // 2. Click on the subtitle to select it.
      if (!NetflixCrawler.controls.controlAudioSubtitleMenu) {
        return false
      }

      if (NetflixCrawler.controls.selectedSubtitleOption === NetflixCrawler.controls.englishSubtitleOption) {
        NetflixCrawler.controls.offSubtitleOption.click()
        console.info('[🎹] [Audio/Subtitle] selected off subtitle')
      } else {
        NetflixCrawler.controls.englishSubtitleOption.click()
        console.info('[🎹] [Audio/Subtitle] selected english subtitle')
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
      // 2. Click on the audio option to select it.
      if (!NetflixCrawler.controls.controlAudioSubtitleMenu) {
        return false
      }

      if (NetflixCrawler.controls.selectedAudioOption === NetflixCrawler.controls.englishAudioOption) {
        NetflixCrawler.controls.originalAudioOption.click()
        console.info('[🎹] [Audio/Subtitle] selected original audio')
      } else {
        NetflixCrawler.controls.englishAudioOption.click()
        console.info('[🎹] [Audio/Subtitle] selected english audio')
      }

      // 3. Close the menu.
      _closeAudioSubtitleMenu()

      return true
    })

    return true
  })
}

/**
 * Increases the playback speed to 1.5x
 *
 * The function will do the following:
 * 1. Click on the speed control button to open the menu.
 * 2. Click on the 1.5x option to select it.
 * 3. Close the menu.
 */
function playFastest() {
  Executor.executeOrAddToQueue(() => {
    if (!NetflixCrawler.controls.speedControlButton) {
      return false
    }

    // 1. Click on the speed control button to open the menu.
    NetflixCrawler.controls.speedControlButton.click()

    Executor.executeOrAddToQueue(() => {
      if (!NetflixCrawler.controls.speedControlMenu) {
        return false
      }

      // 2. Click on the 1.5x option to select it.
      NetflixCrawler.controls.fastestSpeedOption.click()
      console.info('[🎹] [Speed] selected fastest speed')

      // 3. Close the menu.
      _closeSpeedControlMenu()

      eventManager.activeEvent = new HotkeysEvent(HotkeysEventType.PLAY_SPEED_FASTEST)

      return true
    })

    return true
  })
}

/**
 * Resets the playback speed to 1x.
 *
 * The function will do the following:
 * 1. Click on the speed control button to open the menu.
 * 2. Click on the 1x option to select it.
 * 3. Close the menu.
 */
function playNormal() {
  Executor.executeOrAddToQueue(() => {
    if (!NetflixCrawler.controls.speedControlButton) {
      return false
    }

    // 1. Click on the speed control button to open the menu.
    NetflixCrawler.controls.speedControlButton.click()

    Executor.executeOrAddToQueue(() => {
      if (!NetflixCrawler.controls.speedControlMenu) {
        return false
      }

      // 2. Click on the 1x option to select it.
      NetflixCrawler.controls.normalSpeedOption.click()
      console.info('[🎹] [Speed] selected normal speed')

      // 3. Close the menu.
      _closeSpeedControlMenu()

      eventManager.activeEvent = new HotkeysEvent(HotkeysEventType.PLAY_SPEED_NORMAL)

      return true
    })

    return true
  })
}

/**
 * Decreases the playback speed to 0.5x.
 *
 * The function will do the following:
 * 1. Click on the speed control button to open the menu.
 * 2. Click on the 0.5x option to select it.
 * 3. Close the menu.
 */
function playSlowest() {
  Executor.executeOrAddToQueue(() => {
    if (!NetflixCrawler.controls.speedControlButton) {
      return false
    }

    // 1. Click on the speed control button to open the menu.
    NetflixCrawler.controls.speedControlButton.click()

    Executor.executeOrAddToQueue(() => {
      if (!NetflixCrawler.controls.speedControlMenu) {
        return false
      }

      // 2. Click on the 0.5x option to select it.
      NetflixCrawler.controls.slowestSpeedOption.click()
      console.info('[🎹] [Speed] selected slowest speed')

      // 3. Close the menu.
      _closeSpeedControlMenu()

      eventManager.activeEvent = new HotkeysEvent(HotkeysEventType.PLAY_SPEED_SLOWEST)

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

function _closeSpeedControlMenu() {
  // Escape key to dismiss the menu
  const keyDownEvent = new KeyboardEvent('keydown', {
    bubbles: true,
    cancelable: true,
    view: window,
    key: 'Escape',
    keyCode: 27,
  })
  NetflixCrawler.controls.speedControlMenu.dispatchEvent(keyDownEvent)

  // Mouse move from the audio/subtitle option to dismiss the active state of the button
  const mouseMoveEvent = new MouseEvent('mousemove', {
    bubbles: true,
    cancelable: true,
    view: window,
    clientX: 0,
    clientY: 0,
  })
  NetflixCrawler.controls.speedControlButton.dispatchEvent(mouseMoveEvent)
}

export default {
  insertContentToastManager,
  toggleSubtitle,
  toggleAudio,
  playFastest,
  playNormal,
  playSlowest,
}
