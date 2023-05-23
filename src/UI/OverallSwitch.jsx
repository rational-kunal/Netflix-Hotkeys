import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import Button from '@mui/material/Button'

function OverallSwitch({ isNetflixHotkeysEnable, onToggle }) {
  return (
    <Button
      variant="outlined"
      size="large"
      startIcon={<PowerSettingsNewIcon />}
      color={isNetflixHotkeysEnable ? 'error' : 'success'}
      onClick={onToggle}
      fullWidth
    >
      {isNetflixHotkeysEnable ? 'Disable' : 'Enable'}
    </Button>
  )
}

export default OverallSwitch
