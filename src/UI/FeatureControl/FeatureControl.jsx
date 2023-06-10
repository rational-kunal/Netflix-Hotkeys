import { Alert, Box, Paper } from '@mui/material'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import usePreferences from '../hooks/usePreferences'
import AutoLoginControl from './AutoLoginControl'
import DefaultUsernameControl from './DefaultUsernameControl'
import PowerSkipControl from './PowerSkipControl'
import ProfilePasswordControl from './ProfilePasswordControl'
import PowerSeekControl from './PowerSeekControl'
import StartNextEpisodeControl from './StartNextEpisodeControl'
import StartOverEpisodeControl from './StartOverEpisodeControl'
import SubtitleToggleControl from './SubtitleToggleControl'
import AudioToggleControl from './AudioToggleControl'

const Warning = (
  <Alert severity="info">
    <Typography variant="subtitle2">
      Please open Netflix profile selection page to properly set up Auto Login feature
    </Typography>
  </Alert>
)

function FeatureControl() {
  const usernameList = usePreferences().usernameList
  const { isAutoLoginEnabled } = usePreferences().autoLogin

  const autoLoginFormOrWarning =
    usernameList.length > 0 ? (
      <Stack direction="row" spacing={1}>
        <DefaultUsernameControl />
        <ProfilePasswordControl />
      </Stack>
    ) : (
      Warning
    )

  return (
    <Paper elevation={1} sx={{ p: 2 }}>
      <Stack direction="column" spacing={1.5} divider={<Divider variant="middle" />}>
        <PowerSeekControl />
        <StartOverEpisodeControl />
        <StartNextEpisodeControl />
        <PowerSkipControl />
        <Box>
          <AutoLoginControl />
          <Box sx={{ mt: 1.5 }} hidden={!isAutoLoginEnabled}>
            {autoLoginFormOrWarning}
          </Box>
        </Box>
        <SubtitleToggleControl />
        <AudioToggleControl />
      </Stack>
    </Paper>
  )
}

export default FeatureControl
