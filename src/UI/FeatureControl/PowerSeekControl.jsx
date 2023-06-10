import { Box, Stack } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import usePreferences from '../hooks/usePreferences'

const Label = (
  <Stack>
    <Typography>
      <kbd>A</kbd> and <kbd>D</kbd> to slow down and speed up
    </Typography>
    <Typography variant="caption">Hold the buttons to speed up by 1.5x or slow down by 0.5x</Typography>
  </Stack>
)

function PowerSeekControl() {
  const { isPowerSeekEnabled, setIsPowerSeekEnabled } = usePreferences().powerSeek

  return (
    <Box>
      <FormControlLabel
        value={Label}
        control={<Switch checked={isPowerSeekEnabled} onChange={() => setIsPowerSeekEnabled(!isPowerSeekEnabled)} />}
        label={Label}
      />
    </Box>
  )
}

export default PowerSeekControl
