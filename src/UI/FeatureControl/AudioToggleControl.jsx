import { Box, Stack } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import usePreferences from '../hooks/usePreferences'
import Typography from '@mui/material/Typography'

const Label = (
  <Stack>
    <Typography>
      <kbd>V</kbd> to toggle audio.
    </Typography>
    <Typography variant="caption">Toggle between english audio and original audio.</Typography>
  </Stack>
)

function AudioToggleControl() {
  const { isAudioToggleEnabled, setIsAudioToggleEnabled } = usePreferences().audioToggle

  return (
    <Box>
      <FormControlLabel
        label={Label}
        control={
          <Switch
            inputProps={{ name: 'Subtitle Toggle' }}
            checked={isAudioToggleEnabled}
            onChange={() => setIsAudioToggleEnabled(!isAudioToggleEnabled)}
          />
        }
      />
    </Box>
  )
}

export default AudioToggleControl
