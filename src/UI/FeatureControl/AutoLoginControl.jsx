import { Box } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import usePreferences from '../hooks/usePreferences'

const Label = 'Auto Login'

function AutoLoginControl() {
  const { isAutoLoginEnabled, setIsAutoLoginEnabled } = usePreferences().autoLogin

  return (
    <Box>
      <FormControlLabel
        value={Label}
        control={<Switch checked={isAutoLoginEnabled} onChange={() => setIsAutoLoginEnabled(!isAutoLoginEnabled)} />}
        label={Label}
      />
    </Box>
  )
}

export default AutoLoginControl
