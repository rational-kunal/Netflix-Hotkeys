import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'

function FeatureTextInput({ label, type = 'text', value, onValueChange }) {
  const handleValueChange = (event) => {
    onValueChange(event.target.value)
  }

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel>{label}</InputLabel>
      <OutlinedInput type={type} label={label} value={value} onChange={handleValueChange} />
    </FormControl>
  )
}

export default FeatureTextInput
