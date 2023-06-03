import { Box } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import usePreferences from '../hooks/usePreferences'
import Typography from '@mui/material/Typography'

const Label = (
  <Typography>
    <kbd>N</kbd> to next episode.
  </Typography>
)

function StartNextEpisodeControl() {
  const { isStartNextEpisodeEnabled, setIsStartNextEpisodeEnabled } = usePreferences().startNextEpisode

  return (
    <Box>
      <FormControlLabel
        value={Label}
        control={
          <Switch
            checked={isStartNextEpisodeEnabled}
            onChange={() => setIsStartNextEpisodeEnabled(!isStartNextEpisodeEnabled)}
          />
        }
        label={Label}
      />
    </Box>
  )
}

export default StartNextEpisodeControl
