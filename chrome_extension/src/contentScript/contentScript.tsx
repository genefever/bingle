import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import 'fontsource-roboto'
import InfoCard from '../components/InfoCard'
import Popup from '../components/Popup'
import { Card, CardHeader } from '@mui/material'
import './contentScript.css'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import { MessageType } from '../utils/types'
import { fetchWikiData } from '../utils/api'
import { WikiData } from '../utils/api'

// Main component that shows the "Bingle search results" popup on the webpage when activated.
const App: React.FC<{}> = () => {
  const [candidates, setCandidates] = useState<any>(new Array(3).fill(null))
  const [isActive, setIsActive] = useState<boolean>(false)

  useEffect(() => {
    // Receive message from background.ts to fetch the ranked wiki data.
    chrome.runtime.onMessage.addListener((message: MessageType) =>
      handleMessage(message)
    )

    // Remove listener when this component unmounts
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage)
    }
  }, [])

  // Called when background.ts sends message to set isActive
  const handleMessage = (message: MessageType) => {
    if (message.type === 'SET_QUERY') {
      fetchWikiData(message.query).then((res) => {
        setCandidates(res)
        setIsActive(true)
      })
    }
  }

  // Close the popup
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

            <Popup candidates={candidates} />
          </Card>
        </ClickAwayListener>
      )}
    </>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
