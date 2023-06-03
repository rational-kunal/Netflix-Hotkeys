import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import Button from '@mui/material/Button'
import usePreferences from './hooks/usePreferences'

function OverallSwitch() {
  const { isNetflixHotkeysEnabled, setIsNetflixHotkeysEnabled } = usePreferences().netflixHotkeys
  return (
    <Button
      variant="outlined"
      size="large"
      startIcon={<PowerSettingsNewIcon />}
      color={isNetflixHotkeysEnabled ? 'error' : 'success'}
      onClick={() => setIsNetflixHotkeysEnabled(!isNetflixHotkeysEnabled)}
      fullWidth
    >
      {isNetflixHotkeysEnabled ? 'Disable' : 'Enable'}
    </Button>
  )
}

export default OverallSwitch
