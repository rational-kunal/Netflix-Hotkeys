import { render } from '@testing-library/react'
import SubtitleToggleControl from '../SubtitleToggleControl'
import '@testing-library/jest-dom'
import { Preferences } from '../../../core/Preferences'
import { act } from 'react-dom/test-utils'

describe('Subtitle Toggle form', () => {
  it('is rendered correctly', () => {
    const { queryByText, queryByRole } = render(<SubtitleToggleControl />)

    expect(queryByText('to toggle subtitles.')).toBeInTheDocument()
    expect(queryByText('Toggle between english subtitle and no subtitle.')).toBeInTheDocument()
    expect(queryByRole('checkbox')).toBeInTheDocument()
  })

  it('is checked if isSubtitleToggleEnabled is true', () => {
    Preferences.instance.isSubtitleToggleEnabled = true

    const { queryByRole } = render(<SubtitleToggleControl />)
    expect(queryByRole('checkbox')).toBeChecked()
  })

  it('is unchecked if isSubtitleToggleEnabled is false', () => {
    Preferences.instance.isSubtitleToggleEnabled = false

    const { queryByRole } = render(<SubtitleToggleControl />)
    expect(queryByRole('checkbox')).not.toBeChecked()
  })

  it('updates isSubtitleToggleEnabled when checkbox is clicked', () => {
    Preferences.instance.isSubtitleToggleEnabled = false

    const { queryByRole } = render(<SubtitleToggleControl />)
    const checkbox = queryByRole('checkbox')
    act(() => {
      checkbox.click()
    })

    expect(Preferences.instance.isSubtitleToggleEnabled).toBe(true)
  })
})
