import Stack from '@mui/material/Stack'
import { Paper } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

function FeatureList({ isSkipIntroEnable, skipIntroToggle }) {
  return (
    <Paper elevation={1} sx={{ p: 2 }}>
      <Stack direction="column">
        <FormControlLabel
          value="Automatically skip intro"
          control={
            <Switch color="primary" checked={isSkipIntroEnable} onChange={skipIntroToggle} />
          }
          label="Automatically skip intro"
        />
      </Stack>
    </Paper>
  )
}

export default FeatureList
