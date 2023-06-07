import { render } from '@testing-library/react'
import FeatureControl from '../FeatureControl'
import '@testing-library/jest-dom'
import { preferences } from '../../../core/Preferences'
import { act } from 'react-dom/test-utils'

describe('Auto Login form', () => {
  describe('warning', () => {
    it('should appear if usernameList is empty', () => {
      preferences.usernameList = []
      const { getByText } = render(<FeatureControl />)

      expect(
        getByText('Please open Netflix profile selection page to properly set up Auto Login feature.'),
      ).toBeInTheDocument()
    })

    it('should not appear if usernameList is not empty', () => {
      preferences.usernameList = ['test']
      const { queryByText } = render(<FeatureControl />)

      expect(
        queryByText('Please open Netflix profile selection page to properly set up Auto Login feature.'),
      ).not.toBeInTheDocument()
    })

    it('should disappear when usernameList is updated', () => {
      preferences.usernameList = []
      const { queryByText } = render(<FeatureControl />)

      expect(
        queryByText('Please open Netflix profile selection page to properly set up Auto Login feature.'),
      ).toBeInTheDocument()

      act(() => {
        preferences.usernameList = ['test']
      })

      expect(
        queryByText('Please open Netflix profile selection page to properly set up Auto Login feature.'),
      ).not.toBeInTheDocument()
    })
  })
})
