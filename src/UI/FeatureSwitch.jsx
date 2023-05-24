import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

function FeatureSwitch({ checked = false, label = false, onToggle = () => {}, disabled = false }) {
  return (
    <FormControlLabel
      value={label}
      control={<Switch checked={checked} onChange={onToggle} disabled={disabled} />}
      label={label}
    />
  )
}

export default FeatureSwitch
