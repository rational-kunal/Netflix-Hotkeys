import FeatureSwitch from './FeatureSwitch'
import Stack from '@mui/material/Stack'
import { Box, Paper } from '@mui/material'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import OutlinedInput from '@mui/material/OutlinedInput'

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
  const handleUserNameSelect = (event) => {
    onUsernameSelect(event.target.value)
  }

  const handleProfilePasswordChange = (event) => {
    onProfilePasswordChange(event.target.value)
  }

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
          checked={isPowerSkipEnable}
          label="Power Skip (Intro, End Credits)"
          onToggle={powerSkipToggle}
        />

        <div>
          <FeatureSwitch
            checked={isAutoLoginEnable}
            label="Auto Login"
            onToggle={autoLoginToggle}
          />

          <Box sx={{ ml: '8%!important' }} hidden={!isAutoLoginEnable}>
            <Stack direction="column" spacing={0.8}>
              <FormControl size="small" fullWidth>
                <InputLabel>Default account</InputLabel>
                <Select
                  value={defaultUsername}
                  label="Default Account"
                  onChange={handleUserNameSelect}
                >
                  {usernameList.map((username) => (
                    <MenuItem value={username} key={username}>
                      {username}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small" variant="outlined" fullWidth>
                <InputLabel>Profile password</InputLabel>
                <OutlinedInput
                  type="password"
                  label="Profile password"
                  value={profilePassword}
                  onChange={handleProfilePasswordChange}
                />
              </FormControl>
            </Stack>
          </Box>
        </div>
      </Stack>
    </Paper>
  )
}

export default FeatureList
