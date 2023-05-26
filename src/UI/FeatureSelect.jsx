import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

function FeatureSelect({ label, valueList, defaultValue, onSelect }) {
  const handleSelect = (event) => {
    onSelect(event.target.value)
  }

  return (
    <FormControl fullWidth>
      <InputLabel> {label} </InputLabel>
      <Select value={defaultValue} label={label} onChange={handleSelect}>
        {valueList.map((value) => (
          <MenuItem value={value} key={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default FeatureSelect
