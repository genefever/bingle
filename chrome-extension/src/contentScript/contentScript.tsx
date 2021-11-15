import React from 'react'
import ReactDOM from 'react-dom'
import Popup from '../components/Popup'
import { Card } from '@mui/material'
import './contentScript.css'

const App: React.FC<{}> = () => {
  return (
    <Card className="overlayCard">
      <Popup />
    </Card>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
