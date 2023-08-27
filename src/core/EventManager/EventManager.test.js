import { eventManager, HotkeysEvent, HotkeysEventType } from './index'

describe('EventManager', () => {
  afterEach(() => {
    eventManager.reset()
  })

  it('listeners should be called when event is published', () => {
    const callback = jest.fn()
    eventManager.addEventListener(callback)

    eventManager.publish(new HotkeysEvent(HotkeysEventType.PLAY_SPEED_FAST))

    expect(callback).toHaveBeenCalledWith({ type: HotkeysEventType.PLAY_SPEED_FAST })
  })

  it('listeners should be called multiple times if event is published multiple times', () => {
    const callback = jest.fn()
    eventManager.addEventListener(callback)

    eventManager.publish(new HotkeysEvent(HotkeysEventType.PLAY_SPEED_FAST))
    eventManager.publish(new HotkeysEvent(HotkeysEventType.PLAY_SPEED_NORMAL))

    expect(callback).toHaveBeenCalledWith({ type: HotkeysEventType.PLAY_SPEED_FAST })
    expect(callback).toHaveBeenCalledWith({ type: HotkeysEventType.PLAY_SPEED_NORMAL })
    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('listeners should not be called after being removed', () => {
    const callback = jest.fn()
    eventManager.addEventListener(callback)
    eventManager.removeEventListener(callback)

    eventManager.publish(new HotkeysEvent(HotkeysEventType.PLAY_SPEED_FAST))

    expect(callback).not.toHaveBeenCalled()
  })
})
