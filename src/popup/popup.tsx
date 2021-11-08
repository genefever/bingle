import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import 'fontsource-roboto'
import './popup.css'
import InfoCard from './InfoCard'

const App: React.FC<{}> = () => {
  const [candidates, setCandidates] = useState<string[]>([
    'Toronto',
    'New York',
    'Sunnyvale',
  ])

  return (
    <div>
      {candidates.map((candidate, index) => (
        <InfoCard query={candidate} key={index} />
      ))}
    </div>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
