import Toast from '../Toast'
import ToastModel from '../ToastModel'
import { HotkeysEvent, HotkeysEventType } from '../../../core/EventManager'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

jest.useFakeTimers()

describe('Toast render for', () => {
  it('null model', () => {
    const { container } = render(<Toast model={null} />)

    expect(container.firstChild).toMatchSnapshot()
    expect(container.firstChild).toBeNull()
  })

  it('Play fastest event model', () => {
    const model = ToastModel.fromEvent(new HotkeysEvent(HotkeysEventType.PLAY_SPEED_FASTEST))
    const { container, getByText } = render(<Toast model={model} />)

    expect(container.firstChild).toMatchSnapshot()
    expect(getByText('1.5x')).toBeInTheDocument()
  })

  it('Play slowest event model', () => {
    const model = ToastModel.fromEvent(new HotkeysEvent(HotkeysEventType.PLAY_SPEED_SLOWEST))
    const { container, getByText } = render(<Toast model={model} />)

    expect(container.firstChild).toMatchSnapshot()
    expect(getByText('0.5x')).toBeInTheDocument()
  })

  it('Play normal event model', () => {
    const model = ToastModel.fromEvent(new HotkeysEvent(HotkeysEventType.PLAY_SPEED_NORMAL))
    const { container } = render(<Toast model={model} />)

    expect(container.firstChild).toMatchSnapshot()
    expect(container.firstChild).toBeNull()
  })

  it('Audio changed to english event model', () => {
    const model = ToastModel.fromEvent(new HotkeysEvent(HotkeysEventType.AUDIO_CHANGE_ENGLISH))
    const { container, getByText } = render(<Toast model={model} />)

    expect(container.firstChild).toMatchSnapshot()
    expect(getByText('Audio changed to English')).toBeInTheDocument()
  })

  it('Audio changed to original event model', () => {
    const model = ToastModel.fromEvent(new HotkeysEvent(HotkeysEventType.AUDIO_CHANGE_ORIGINAL))
    const { container, getByText } = render(<Toast model={model} />)

    expect(container.firstChild).toMatchSnapshot()
    expect(getByText('Audio changed to Original')).toBeInTheDocument()
  })

  it('Subtitle on event model', () => {
    const model = ToastModel.fromEvent(new HotkeysEvent(HotkeysEventType.SUBTITLE_ON))
    const { container, getByText } = render(<Toast model={model} />)

    expect(container.firstChild).toMatchSnapshot()
    expect(getByText('Subtitles on')).toBeInTheDocument()
  })

  it('Subtitle off event model', () => {
    const model = ToastModel.fromEvent(new HotkeysEvent(HotkeysEventType.SUBTITLE_OFF))
    const { container, getByText } = render(<Toast model={model} />)

    expect(container.firstChild).toMatchSnapshot()
    expect(getByText('Subtitles off')).toBeInTheDocument()
  })
})

describe('Toast onClose', () => {
  it('should be called', () => {
    const model = new ToastModel(null, null, /** shouldAutoClose = */ true)
    const onClose = jest.fn()
    const {} = render(<Toast model={model} onClose={onClose} />)

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(onClose).toHaveBeenCalled()
  })

  it('should not be called', () => {
    const model = new ToastModel(null, null, /** shouldAutoClose = */ false)
    const onClose = jest.fn()
    const {} = render(<Toast model={model} onClose={onClose} />)

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(onClose).not.toHaveBeenCalled()
  })
})
