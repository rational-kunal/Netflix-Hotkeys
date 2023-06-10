import { Box, Stack, Typography } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import usePreferences from '../hooks/usePreferences'

const Label = (
  <Stack>
    <Typography> Power Skip </Typography>
    <Typography variant="caption">Skip through Intro, Recap and End Credits</Typography>
  </Stack>
)

function PowerSkipControl() {
  const { isPowerSkipEnabled, setIsPowerSkipEnabled } = usePreferences().powerSkip

  return (
    <Box>
      <FormControlLabel
        value={Label}
        control={<Switch checked={isPowerSkipEnabled} onChange={() => setIsPowerSkipEnabled(!isPowerSkipEnabled)} />}
        label={Label}
      />
    </Box>
  )
}

export default PowerSkipControl
