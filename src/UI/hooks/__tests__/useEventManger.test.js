import useEventManager from '../useEventManager'
import { renderHook, act } from '@testing-library/react'
import { eventManager, HotkeysEvent } from '../../../core/EventManager'

describe('useEventManager', () => {
  afterEach(() => {
    eventManager.reset()
  })

  it('should have null as active event by default', () => {
    const { result } = renderHook(() => useEventManager())
    expect(result.current).toBeNull()
  })

  it('should update active event when eventManager.activeEvent is changed', () => {
    const { result } = renderHook(() => useEventManager())

    act(() => {
      eventManager.activeEvent = new HotkeysEvent(HotkeysEvent.PLAY_SPEED_FAST)
    })

    expect(result.current).toEqual(expect.objectContaining({ type: HotkeysEvent.PLAY_SPEED_FAST }))
  })
})
