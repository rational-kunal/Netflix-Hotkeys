import { render } from '@testing-library/react'
import AudioToggleControl from '../AudioToggleControl'
import '@testing-library/jest-dom'
import { Preferences } from '../../../core/Preferences'
import { act } from 'react-dom/test-utils'

describe('Audio Toggle form', () => {
  it('is rendered correctly', () => {
    const { queryByText, queryByRole } = render(<AudioToggleControl />)

    expect(queryByText('to toggle audio')).toBeInTheDocument()
    expect(queryByText('Toggle between English and Original audio')).toBeInTheDocument()
    expect(queryByRole('checkbox')).toBeInTheDocument()
  })

  it('is checked if isAudioToggleEnabled is true', () => {
    Preferences.instance.isAudioToggleEnabled = true

    const { queryByRole } = render(<AudioToggleControl />)
    expect(queryByRole('checkbox')).toBeChecked()
  })

  it('is unchecked if isAudioToggleEnabled is false', () => {
    Preferences.instance.isAudioToggleEnabled = false

    const { queryByRole } = render(<AudioToggleControl />)
    expect(queryByRole('checkbox')).not.toBeChecked()
  })

  it('updates isAudioToggleEnabled when checkbox is clicked', () => {
    Preferences.instance.isAudioToggleEnabled = false

    const { queryByRole } = render(<AudioToggleControl />)
    const checkbox = queryByRole('checkbox')

    act(() => {
      checkbox.click()
    })

    expect(Preferences.instance.isAudioToggleEnabled).toBe(true)
  })
})
