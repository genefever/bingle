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
  }, [])

  const handleOptionsChange = (e) => {
    const selectedValue = e.target.value
    const updateOptions: LocalStorageOptions = {
      ...options,
      overlaySetting: selectedValue,
    }

    setStoredOptions(updateOptions).then(() => {
      setOptions(updateOptions)
    })
  }

  if (!options) {
    return null
  }

  return (
    <Box px="8px" py="4px">
      <FormControl component="fieldset">
        <FormLabel component="legend">Bingle Display Settings</FormLabel>
        <RadioGroup
          value={options.overlaySetting}
          onChange={(e) => handleOptionsChange(e)}
        >
          <FormControlLabel value="auto" control={<Radio />} label="Auto" />
          <FormControlLabel value="toggle" control={<Radio />} label="Toggle" />
          <FormControlLabel
            value="disable"
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
