import FeatureSwitch from './FeatureSwitch'
import Stack from '@mui/material/Stack'
import { Paper } from '@mui/material'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

function FeatureList({ isSkipIntroEnable, skipIntroToggle }) {
  return (
    <Paper elevation={1} sx={{ p: 2 }}>
      <Stack direction="column" spacing={1} divider={<Divider variant="middle" />}>
        <Typography variant="h6"> Supported Features </Typography>

        <FeatureSwitch
          checked={true}
          label={
            <Typography>
              <kbd>A</kbd> and <kbd>D</kbd> to seek backward and forward.
            </Typography>
          }
          disabled={true}
        />

        <FeatureSwitch
          checked={isSkipIntroEnable}
          label="Automatically skip intro"
          onToggle={skipIntroToggle}
        />
      </Stack>
    </Paper>
  )
}

export default FeatureList
