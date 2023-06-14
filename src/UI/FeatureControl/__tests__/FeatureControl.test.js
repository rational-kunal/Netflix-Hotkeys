import { render } from '@testing-library/react'
import FeatureControl from '../FeatureControl'
import '@testing-library/jest-dom'
import { Preferences } from '../../../core/Preferences'
import { act } from 'react-dom/test-utils'

const warningTextRegEx = /please open netflix to properly set up auto login feature/i
const warningLinkRegEx = /profile selection page/i

describe('Auto Login form', () => {
  afterEach(() => {
    Preferences.reset()
  })

  describe('warning', () => {
    it('should appear if usernameList is empty', () => {
      Preferences.instance.usernameList = []
      const { queryByText } = render(<FeatureControl />)

      expect(queryByText(warningTextRegEx)).toBeInTheDocument()
      expect(queryByText(warningLinkRegEx)).toBeInTheDocument()
    })

    it('should not appear if usernameList is not empty', () => {
      Preferences.instance.usernameList = ['test']
      const { queryByText } = render(<FeatureControl />)

      expect(queryByText(warningTextRegEx)).not.toBeInTheDocument()
      expect(queryByText(warningLinkRegEx)).not.toBeInTheDocument()
    })

    it('should disappear when usernameList is updated', () => {
      Preferences.instance.usernameList = []
      const { queryByText } = render(<FeatureControl />)

      expect(queryByText(warningTextRegEx)).toBeInTheDocument()
      expect(queryByText(warningLinkRegEx)).toBeInTheDocument()

      act(() => {
        Preferences.instance.usernameList = ['test']
      })

      expect(queryByText(warningTextRegEx)).not.toBeInTheDocument()
      expect(queryByText(warningLinkRegEx)).not.toBeInTheDocument()
    })

    it('should point to correct link', () => {
      const { queryByText } = render(<FeatureControl />)

      expect(queryByText(warningLinkRegEx)).toHaveAttribute('href', 'https://www.netflix.com/profiles')
      expect(queryByText(warningLinkRegEx)).toHaveAttribute('target', '_blank')
    })
  })
})

describe('Subtitle Toggle form', () => {
  it('is rendered in the FeatureControl', () => {
    const { queryByText, queryByRole } = render(<FeatureControl />)

    expect(queryByText('to toggle subtitles')).toBeInTheDocument()
    expect(queryByText('Toggle between english subtitle and no subtitle')).toBeInTheDocument()
    expect(
      queryByRole('checkbox', {
        name: /c to toggle subtitles toggle between english subtitle and no subtitle/i,
      }),
    ).toBeInTheDocument()
  })
})

describe('Audio Toggle form', () => {
  it('is rendered in the FeatureControl', () => {
    const { queryByText, queryByRole } = render(<FeatureControl />)

    expect(queryByText('to toggle audio')).toBeInTheDocument()
    expect(queryByText('Toggle between English and Original audio')).toBeInTheDocument()
    expect(
      queryByRole('checkbox', {
        name: /v to toggle audio toggle between english and original audio/i,
      }),
    ).toBeInTheDocument()
  })
})

describe('Power Seek form', () => {
  it('is rendered in the FeatureControl', () => {
    const { queryByText, queryByRole } = render(<FeatureControl />)

    expect(queryByText(/and to slow down and speed up/i)).toBeInTheDocument()
    expect(queryByText('Hold the buttons to speed up by 1.5x or slow down by 0.5x')).toBeInTheDocument()
    expect(
      queryByRole('checkbox', {
        name: /a and d to slow down and speed up hold the buttons to speed up by 1\.5x or slow down by 0\.5x/i,
      }),
    ).toBeInTheDocument()
  })
})
