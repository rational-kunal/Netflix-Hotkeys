import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import usePreferences from '../hooks/usePreferences'

const Label = 'Profile Password'

function ProfilePasswordControl() {
  const { profilePassword, setProfilePassword } = usePreferences().profilePassword
  const { isAutoLoginEnabled } = usePreferences().autoLogin

  return (
    <FormControl variant="outlined" disabled={!isAutoLoginEnabled} fullWidth>
      <InputLabel>{Label}</InputLabel>
      <OutlinedInput
        type="password"
        label={Label}
        value={profilePassword}
        onChange={(e) => {
          setProfilePassword(e.target.value)
        }}
      />
    </FormControl>
  )
}

export default ProfilePasswordControl
