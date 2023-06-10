import { render } from '@testing-library/react'
import PowerSeekControl from '../PowerSeekControl'
import '@testing-library/jest-dom'
import { Preferences } from '../../../core/Preferences'
import { act } from 'react-dom/test-utils'

describe('Power Seek form', () => {
  it('is rendered correctly', () => {
    const { queryByText, queryByRole } = render(<PowerSeekControl />)

    expect(queryByText(/and to slow down and speed up/i)).toBeInTheDocument()
    expect(queryByText('Hold the buttons to speed up by 1.5x or slow down by 0.5x')).toBeInTheDocument()
    expect(
      queryByRole('checkbox', {
        name: /a and d to slow down and speed up hold the buttons to speed up by 1\.5x or slow down by 0\.5x/i,
      }),
    ).toBeInTheDocument()
  })

  it('is checked if isPowerSeekEnabled is true', () => {
    Preferences.instance.isPowerSeekEnabled = true

    const { queryByRole } = render(<PowerSeekControl />)
    expect(queryByRole('checkbox')).toBeChecked()
  })

  it('is unchecked if isPowerSeekEnabled is false', () => {
    Preferences.instance.isPowerSeekEnabled = false

    const { queryByRole } = render(<PowerSeekControl />)
    expect(queryByRole('checkbox')).not.toBeChecked()
  })

  it('updates isPowerSeekEnabled when checkbox is clicked', () => {
    Preferences.instance.isPowerSeekEnabled = false

    const { queryByRole } = render(<PowerSeekControl />)
    const checkbox = queryByRole('checkbox')

    act(() => {
      checkbox.click()
    })

    expect(Preferences.instance.isPowerSeekEnabled).toBe(true)
  })
})
