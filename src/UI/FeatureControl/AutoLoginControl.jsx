import { Box, Typography, Stack } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import usePreferences from '../hooks/usePreferences'

const Label = (
  <Stack>
    <Typography> Auto Login </Typography>
    <Typography variant="caption">
      Automatically login to the specified profile with the password (if needed)
    </Typography>
  </Stack>
)

function AutoLoginControl() {
  const { isAutoLoginEnabled, setIsAutoLoginEnabled } = usePreferences().autoLogin

  return (
    <Box>
      <FormControlLabel
        label={Label}
        control={<Switch checked={isAutoLoginEnabled} onChange={() => setIsAutoLoginEnabled(!isAutoLoginEnabled)} />}
      />
    </Box>
  )
}

export default AutoLoginControl
