import useEventManager from '../useEventManager'
import { renderHook, act } from '@testing-library/react'
import { eventManager, HotkeysEvent } from '../../../core/EventManager'

describe('useEventManager', () => {
  afterEach(() => {
    eventManager.reset()
  })

  it('should update active event when event is published', () => {
    let event = null
    const { result } = renderHook(() => useEventManager((e) => (event = e)))

    act(() => {
      eventManager.publish(new HotkeysEvent(HotkeysEvent.PLAY_SPEED_FAST))
    })

    expect(event).toEqual(expect.objectContaining({ type: HotkeysEvent.PLAY_SPEED_FAST }))
  })
})
