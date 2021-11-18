import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Popup from '../components/Popup'
import { Card, CardActions, CardHeader, CardContent } from '@mui/material'
import './contentScript.css'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import { getStoredIsActive } from '../utils/storage'

const App: React.FC<{}> = () => {
  const [isActive, setIsActive] = useState<boolean>(true)

  useEffect(() => {
    // Set options from saved options in local storage.
    getStoredIsActive().then((options) => setIsActive(options.isActive))
  }, [])

  const handleClose = () => {
    setIsActive(false)
  }

  return (
    <>
      {isActive && (
        <ClickAwayListener onClickAway={handleClose}>
          <Card className="overlayCard">
            <CardHeader
              action={
                <IconButton
                  className="css-nrdprl-MuiTypography-root"
                  onClick={handleClose}
                >
                  <CloseIcon />
                </IconButton>
              }
              className="overlayCardHeader"
              subheader="Bingle search results"
            />

            <Popup />
          </Card>
        </ClickAwayListener>
      )}
    </>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
