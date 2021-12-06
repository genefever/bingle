import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import 'fontsource-roboto'
import Popup from '../components/Popup'
import { Card, CardHeader } from '@mui/material'
import './contentScript.css'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import { MessageType, Messages } from '../utils/types'
import { fetchWikiData } from '../utils/api'
import { WikiData } from '../utils/api'

// Main component that shows the "Bingle search results" popup on the webpage when activated.
const App: React.FC<{}> = () => {
  const [candidates, setCandidates] = useState<Array<WikiData>>(
    new Array(3).fill(null)
  )
  const [isActive, setIsActive] = useState<boolean>(false)

  useEffect(() => {
    // Receive message from background.ts to fetch the ranked wiki data
    chrome.runtime.onMessage.addListener((message: MessageType) =>
      handleMessage(message)
    )

    // Remove listener when this component unmounts
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage)
    }
  }, [])

  // Handle incoming chrome.runtime messages
  const handleMessage = (message: MessageType) => {
    if (message.type === Messages.SET_QUERY) {
      setIsActive(true)
      fetchWikiData(message.query)
        .then((res) => {
          setCandidates(res)
        })
        .catch((err) => {
          setCandidates([
            {
              title: err.message,
              description: '',
              url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            },
          ])
        })
    } else if (message.type === Messages.TOGGLE_IS_ACTIVE) {
      setIsActive(message.isActive)
      setCandidates(new Array(3).fill(null))
    }
  }

  // Close the popup
  const handleClose = () => {
    setIsActive(false)
    setCandidates(new Array(3).fill(null))
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
