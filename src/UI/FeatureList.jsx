import FeatureSwitch from './FeatureSwitch'
import Stack from '@mui/material/Stack'
import { Box, Paper } from '@mui/material'
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
}) {
  return (
    <Paper elevation={1} sx={{ p: 2 }}>
      <Stack direction="column" spacing={1.5} divider={<Divider variant="middle" />}>
        <Typography variant="h6"> Supported Features </Typography>

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

        {/* Power Skip (Intro, End Credits) */}
        <FeatureSwitch
          checked={isPowerSkipEnable}
          label="Power Skip (Intro, End Credits)"
          onToggle={powerSkipToggle}
        />

        {/* Auto Login */}
        <Box>
          <FeatureSwitch
            checked={isAutoLoginEnable}
            label="Auto Login"
            onToggle={autoLoginToggle}
          />

          <Box sx={{ mt: 1 }} hidden={!isAutoLoginEnable}>
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
          </Box>
        </Box>
      </Stack>
    </Paper>
  )
}

export default FeatureList