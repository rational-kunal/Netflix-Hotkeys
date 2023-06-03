import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import usePreferences from '../hooks/usePreferences'

const Label = 'Default profile'

function DefaultUsernameControl() {
  const preferences = usePreferences()
  const { usernameList } = preferences
  const { defaultUsername, setDefaultUsername } = preferences.defaultUsername
  const { isAutoLoginEnabled } = preferences.autoLogin

  return (
    <FormControl disabled={!isAutoLoginEnabled} fullWidth>
      <InputLabel> {Label} </InputLabel>
      <Select value={defaultUsername} label={Label} onChange={(e) => setDefaultUsername(e.target.value)}>
        {usernameList.map((username) => (
          <MenuItem value={username} key={username}>
            {username}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default DefaultUsernameControl
