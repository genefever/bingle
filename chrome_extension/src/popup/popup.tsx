import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import 'fontsource-roboto'
import './popup.css'
import {
  getStoredOptions,
  setStoredOptions,
  LocalStorageOptions,
} from '../utils/storage'

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null)

  useEffect(() => {
    // Set options from saved options in local storage.
    getStoredOptions().then((options) => setOptions(options))
  })

  const handleOptionsChange = () => {
    // TODO Update toggle
    // Iterate through all options and only set true to option that's selected.
    // Rest should be false.
    // const updateOptions: LocalStorageOptions = {
    // }
    // setStoredOptions(options).then(() => {
    //   setOptions
    // })
  }

  if (!options) {
    return null
  }

  return (
    <Box px="8px" py="4px">
      <FormControl component="fieldset">
        <FormLabel component="legend">Bingle Display Settings</FormLabel>
        <RadioGroup defaultValue="female" name="radio-buttons-group">
          <FormControlLabel
            value={options.hasAutoOverlay}
            control={<Radio />}
            label="Auto"
          />
          <FormControlLabel
            value="toggleOverlay"
            control={<Radio />}
            label="Toggle"
          />
          <FormControlLabel
            value="disableOverlay"
            control={<Radio />}
            label="Disable"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
