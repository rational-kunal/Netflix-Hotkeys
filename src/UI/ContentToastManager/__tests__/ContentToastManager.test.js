import ContentToastManager from '../ContentToastManager'
import ToastModel from '../ToastModel'
import { HotkeysEvent, HotkeysEventType, eventManager } from '../../../core/EventManager'
import '@testing-library/jest-dom'
import { render, screen, waitFor, act } from '@testing-library/react'

jest.useFakeTimers()

describe('ContentToastManager flow', () => {
  it('Auto closes on subtitle event', async () => {
    const { container } = render(<ContentToastManager />)

    act(() => {
      eventManager.publish(new HotkeysEvent(HotkeysEventType.SUBTITLE_ON))
    })

    expect(container.firstChild).not.toBeNull()

    act(() => {
      jest.advanceTimersByTime(2000)
    })

    expect(container.firstChild).toBeNull()
  })

  it('Does not auto close on playback event', async () => {
    const { container } = render(<ContentToastManager />)

    act(() => {
      eventManager.publish(new HotkeysEvent(HotkeysEventType.PLAY_SPEED_FASTEST))
    })

    expect(container.firstChild).not.toBeNull()

    act(() => {
      jest.advanceTimersByTime(2000)
    })

    expect(container.firstChild).not.toBeNull()
  })
})
