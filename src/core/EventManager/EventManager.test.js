import { eventManager, HotkeysEvent, HotkeysEventType } from './index'

describe('EventManager', () => {
  afterEach(() => {
    eventManager.reset()
  })

  it('should have null as active event by default', () => {
    expect(eventManager.activeEvent).toBeNull()
  })

  it('should be able to set the active event', () => {
    eventManager.activeEvent = new HotkeysEvent(HotkeysEventType.PLAY_SPEED_NORMAL)
    expect(eventManager.activeEvent.type).toBe(HotkeysEventType.PLAY_SPEED_NORMAL)
  })

  it('should call listeners if active event is changed', () => {
    const callback = jest.fn()
    eventManager.addEventListener(callback)

    eventManager.activeEvent = new HotkeysEvent(HotkeysEventType.PLAY_SPEED_FAST)

    expect(callback).toHaveBeenCalledWith({ type: HotkeysEventType.PLAY_SPEED_FAST })
  })

  it('should call listeners multiple times if active event is changed multiple times', () => {
    const callback = jest.fn()
    eventManager.addEventListener(callback)

    eventManager.activeEvent = new HotkeysEvent(HotkeysEventType.PLAY_SPEED_FAST)
    eventManager.activeEvent = new HotkeysEvent(HotkeysEventType.PLAY_SPEED_NORMAL)
    eventManager.activeEvent = null

    expect(callback).toHaveBeenCalledWith({ type: HotkeysEventType.PLAY_SPEED_FAST })
    expect(callback).toHaveBeenCalledWith({ type: HotkeysEventType.PLAY_SPEED_NORMAL })
    expect(callback).toHaveBeenCalledWith(null)
    expect(callback).toHaveBeenCalledTimes(3)
  })

  it('should not call listener if its removed', () => {
    const callback = jest.fn()
    eventManager.addEventListener(callback)
    eventManager.removeEventListener(callback)

    eventManager.activeEvent = new HotkeysEvent(HotkeysEventType.PLAY_SPEED_FAST)

    expect(callback).not.toHaveBeenCalled()
  })
})
