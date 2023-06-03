import { Box } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import usePreferences from '../hooks/usePreferences'
import Typography from '@mui/material/Typography'

const Label = (
  <Typography>
    <kbd>R</kbd> to start over the episode.
  </Typography>
)

function StartOverEpisodeControl() {
  const { isStartOverEpisodeEnabled, setIsStartOverEpisodeEnabled } = usePreferences().startOverEpisode

  return (
    <Box>
      <FormControlLabel
        value={Label}
        control={
          <Switch
            checked={isStartOverEpisodeEnabled}
            onChange={() => setIsStartOverEpisodeEnabled(!isStartOverEpisodeEnabled)}
          />
        }
        label={Label}
      />
    </Box>
  )
}

export default StartOverEpisodeControl
