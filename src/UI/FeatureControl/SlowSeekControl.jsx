import { Box } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import usePreferences from '../hooks/usePreferences'

const Label = (
  <Typography>
    <kbd>A</kbd> and <kbd>D</kbd> to seek backward and forward.
  </Typography>
)

function SlowSeekControl() {
  const { isSlowSeekEnabled, setIsSlowSeekEnabled } = usePreferences().slowSeek

  return (
    <Box>
      <FormControlLabel
        value={Label}
        control={<Switch checked={isSlowSeekEnabled} onChange={() => setIsSlowSeekEnabled(!isSlowSeekEnabled)} />}
        label={Label}
      />
    </Box>
  )
}

export default SlowSeekControl
