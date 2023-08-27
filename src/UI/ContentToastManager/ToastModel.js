import { HotkeysEvent, HotkeysEventType } from '../../core/EventManager'
import SpeedOutlined from '@mui/icons-material/SpeedOutlined'
import ClosedCaptionOffOutlinedIcon from '@mui/icons-material/ClosedCaptionOffOutlined'
import ClosedCaptionDisabledOutlinedIcon from '@mui/icons-material/ClosedCaptionDisabledOutlined'
import AudiotrackOutlinedIcon from '@mui/icons-material/AudiotrackOutlined'

const DEFAULT_AUTO_CLOSE_DELAY = 850

class ToastModel {
  icon = null
  text = null
  shouldAutoClose = true
  autoCloseDelay = DEFAULT_AUTO_CLOSE_DELAY

  constructor(icon, text, shouldAutoClose = true, autoCloseDelay = DEFAULT_AUTO_CLOSE_DELAY) {
    this.icon = icon
    this.text = text
    this.shouldAutoClose = shouldAutoClose
    this.autoCloseDelay = shouldAutoClose ? autoCloseDelay : null
  }

  /**
   * Create a ToastModel from a HotkeysEvent.
   * @param {HotkeysEvent} event
   * @returns {ToastModel|null}
   */
  static fromEvent(event) {
    if (!event || !event.type) {
      return null
    }

    if (event.type === HotkeysEventType.PLAY_SPEED_SLOWEST) {
      return new ToastModel(SpeedOutlined, '0.5x', false)
    } else if (event.type === HotkeysEventType.PLAY_SPEED_FASTEST) {
      return new ToastModel(SpeedOutlined, '1.5x', false)
    } else if (event.type === HotkeysEventType.SUBTITLE_ON) {
      return new ToastModel(ClosedCaptionOffOutlinedIcon, 'Subtitles on')
    } else if (event.type === HotkeysEventType.SUBTITLE_OFF) {
      return new ToastModel(ClosedCaptionDisabledOutlinedIcon, 'Subtitles off')
    } else if (event.type === HotkeysEventType.AUDIO_CHANGE_ENGLISH) {
      return new ToastModel(AudiotrackOutlinedIcon, 'Audio changed to English')
    } else if (event.type === HotkeysEventType.AUDIO_CHANGE_ORIGINAL) {
      return new ToastModel(AudiotrackOutlinedIcon, 'Audio changed to Original')
    }

    return null
  }
}

export default ToastModel
