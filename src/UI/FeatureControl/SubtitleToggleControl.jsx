import { Box, Stack } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import usePreferences from '../hooks/usePreferences'
import Typography from '@mui/material/Typography'

const Label = (
  <Stack>
    <Typography>
      <kbd>C</kbd> to toggle subtitles.
    </Typography>
    <Typography variant="caption">Toggle between english subtitle and no subtitle.</Typography>
  </Stack>
)

function SubtitleToggleControl() {
  const { isSubtitleToggleEnabled, setIsSubtitleToggleEnabled } = usePreferences().subtitleToggle

  return (
    <Box>
      <FormControlLabel
        label={Label}
        control={
          <Switch
            inputProps={{ name: 'Subtitle Toggle' }}
            checked={isSubtitleToggleEnabled}
            onChange={() => setIsSubtitleToggleEnabled(!isSubtitleToggleEnabled)}
          />
        }
      />
    </Box>
  )
}

export default SubtitleToggleControl
