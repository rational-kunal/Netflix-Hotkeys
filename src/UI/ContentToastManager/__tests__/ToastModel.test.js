import { HotkeysEventType } from '../../../core/EventManager'
import { HotkeysEvent } from '../../../core/EventManager'
import ToastModel from '../ToastModel'

describe('ToastModel', () => {
  it('should create a ToastModel from a HotkeysEvent', () => {
    const event = new HotkeysEvent(HotkeysEventType.PLAY_SPEED_SLOWEST)
    const toastModel = ToastModel.fromEvent(event)
    expect(toastModel).toEqual(
      expect.objectContaining({
        icon: expect.any(Object),
        text: '0.5x',
        shouldAutoClose: false,
        autoCloseDelay: null,
      }),
    )
  })

  it('should return null when event is not supported', () => {
    const event = new HotkeysEvent('NOT_SUPPORTED')
    const toastModel = ToastModel.fromEvent(event)
    expect(toastModel).toBeNull()
  })

  it('should return null when event is null or undefined', () => {
    expect(ToastModel.fromEvent(null)).toBeNull()
    expect(ToastModel.fromEvent(undefined)).toBeNull()
  })
})

describe('ToastModel.fromEvent', () => {
  it('PLAY_SPEED_SLOWEST', () => {
    const event = new HotkeysEvent(HotkeysEventType.PLAY_SPEED_SLOWEST)
    const toastModel = ToastModel.fromEvent(event)
    expect(toastModel).toEqual(
      expect.objectContaining({
        icon: expect.any(Object),
        text: '0.5x',
        shouldAutoClose: false,
        autoCloseDelay: null,
      }),
    )
  })

  it('PLAY_SPEED_FASTEST', () => {
    const event = new HotkeysEvent(HotkeysEventType.PLAY_SPEED_FASTEST)
    const toastModel = ToastModel.fromEvent(event)
    expect(toastModel).toEqual(
      expect.objectContaining({
        icon: expect.any(Object),
        text: '1.5x',
        shouldAutoClose: false,
        autoCloseDelay: null,
      }),
    )
  })

  it('SUBTITLE_ON', () => {
    const event = new HotkeysEvent(HotkeysEventType.SUBTITLE_ON)
    const toastModel = ToastModel.fromEvent(event)
    expect(toastModel).toEqual(
      expect.objectContaining({
        icon: expect.any(Object),
        text: 'Subtitles on',
        shouldAutoClose: true,
        autoCloseDelay: 850,
      }),
    )
  })

  it('SUBTITLE_OFF', () => {
    const event = new HotkeysEvent(HotkeysEventType.SUBTITLE_OFF)
    const toastModel = ToastModel.fromEvent(event)
    expect(toastModel).toEqual(
      expect.objectContaining({
        icon: expect.any(Object),
        text: 'Subtitles off',
        shouldAutoClose: true,
        autoCloseDelay: 850,
      }),
    )
  })

  it('AUDIO_CHANGE_ENGLISH', () => {
    const event = new HotkeysEvent(HotkeysEventType.AUDIO_CHANGE_ENGLISH)
    const toastModel = ToastModel.fromEvent(event)
    expect(toastModel).toEqual(
      expect.objectContaining({
        icon: expect.any(Object),
        text: 'Audio changed to English',
        shouldAutoClose: true,
        autoCloseDelay: 850,
      }),
    )
  })

  it('AUDIO_CHANGE_ORIGINAL', () => {
    const event = new HotkeysEvent(HotkeysEventType.AUDIO_CHANGE_ORIGINAL)
    const toastModel = ToastModel.fromEvent(event)
    expect(toastModel).toEqual(
      expect.objectContaining({
        icon: expect.any(Object),
        text: 'Audio changed to Original',
        shouldAutoClose: true,
        autoCloseDelay: 850,
      }),
    )
  })
})
