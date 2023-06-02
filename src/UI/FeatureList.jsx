import FeatureSwitch from './FeatureSwitch'
import Stack from '@mui/material/Stack'
import { Box, Paper, Alert } from '@mui/material'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import FeatureSelect from './FeatureSelect'
import FeatureTextInput from './FeatureTextInput'

function FeatureList({
  isPowerSkipEnable,
  powerSkipToggle,
  isAutoLoginEnable,
  autoLoginToggle,
  usernameList,
  defaultUsername,
  onUsernameSelect,
  profilePassword,
  onProfilePasswordChange,
  isNextEpisodeHotkeyEnabled,
  onNextEpisodeHotkeyToggle,
  isStartOverEpisodeEnabled,
  onStartOverEpisodeToggle,
}) {
  const autoLoginFormOrWarning =
    usernameList.length > 0 ? (
      <Stack direction="row" spacing={1.5}>
        <FeatureSelect
          label="Default profile"
          valueList={usernameList}
          defaultValue={defaultUsername}
          onSelect={onUsernameSelect}
        />

        {/* TODO: Add validation for password */}
        <FeatureTextInput
          label="Profile password"
          type="password"
          value={profilePassword}
          onValueChange={onProfilePasswordChange}
        />
      </Stack>
    ) : (
      <Alert severity="info">
        <Typography variant="subtitle2">
          Please open Netflix profile selection page and refresh this page to properly set up Auto Login feature.
        </Typography>
      </Alert>
    )

  const startOverEpisodeFeatureSwitch = (
    <FeatureSwitch
      checked={isStartOverEpisodeEnabled}
      label={
        <Typography>
          <kbd>R</kbd> to start over the video.
        </Typography>
      }
      onToggle={onStartOverEpisodeToggle}
    />
  )

  return (
    <Paper elevation={1} sx={{ p: 2 }}>
      <Stack direction="column" spacing={1.5} divider={<Divider variant="middle" />}>
        {/* A and D to seek */}
        <FeatureSwitch
          checked={true}
          label={
            <Typography>
              <kbd>A</kbd> and <kbd>D</kbd> to seek backward and forward.
            </Typography>
          }
          disabled={true}
        />

        {startOverEpisodeFeatureSwitch}

        {/* Next Episode Hotkey */}
        <FeatureSwitch
          checked={isNextEpisodeHotkeyEnabled}
          label={
            <Typography>
              <kbd>N</kbd> to next episode.
            </Typography>
          }
          onToggle={onNextEpisodeHotkeyToggle}
        />

        {/* Power Skip (Intro, End Credits) */}
        <FeatureSwitch checked={isPowerSkipEnable} label="Power Skip (Intro, End Credits)" onToggle={powerSkipToggle} />

        {/* Auto Login */}
        <Box>
          <FeatureSwitch checked={isAutoLoginEnable} label="Auto Login" onToggle={autoLoginToggle} />

          <Box sx={{ mt: 1 }} hidden={!isAutoLoginEnable}>
            {autoLoginFormOrWarning}
          </Box>
        </Box>
      </Stack>
    </Paper>
  )
}

export default FeatureList
