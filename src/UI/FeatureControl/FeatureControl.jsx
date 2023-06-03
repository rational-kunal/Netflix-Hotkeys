import { Alert, Box, Paper } from '@mui/material'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import usePreferences from '../hooks/usePreferences'
import AutoLoginControl from './AutoLoginControl'
import DefaultUsernameControl from './DefaultUsernameControl'
import PowerSkipControl from './PowerSkipControl'
import ProfilePasswordControl from './ProfilePasswordControl'
import SlowSeekControl from './SlowSeekControl'
import StartNextEpisodeControl from './StartNextEpisodeControl'
import StartOverEpisodeControl from './StartOverEpisodeControl'

function FeatureControl() {
  const usernameList = usePreferences().usernameList
  const autoLoginFormOrWarning =
    usernameList.length > 0 ? (
      <Stack direction="row" spacing={1.5}>
        <DefaultUsernameControl />
        <ProfilePasswordControl />
      </Stack>
    ) : (
      <Alert severity="info">
        <Typography variant="subtitle2">
          Please open Netflix profile selection page and refresh this page to properly set up Auto Login feature.
        </Typography>
      </Alert>
    )

  return (
    <Paper elevation={1} sx={{ p: 2 }}>
      <Stack direction="column" spacing={1.5} divider={<Divider variant="middle" />}>
        <SlowSeekControl />
        <StartOverEpisodeControl />
        <StartNextEpisodeControl />
        <PowerSkipControl />
        <Box>
          <AutoLoginControl />
          <Box sx={{ mt: 1 }}>{autoLoginFormOrWarning}</Box>
        </Box>
      </Stack>
    </Paper>
  )
}

export default FeatureControl
