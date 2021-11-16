import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Box } from '@mui/material'
import 'fontsource-roboto'
import './popup.css'
import InfoCard from '../components/InfoCard'

const App: React.FC<{}> = () => {
  const [expanded, setExpanded] = useState<string | false>('panel0')

  const [candidates, setCandidates] = useState<string[]>([
    'Toronto',
    'New York',
    'Sunnyvale',
  ])

  const handleLearnMoreButtonClick = (index: number) => {
    // TODO open Wikipedia page based on link at index
    console.log(index)
  }

  return (
    <Box mx="8px" my="16px">
      {candidates.map((candidate, index) => (
        <InfoCard
          expanded={expanded}
          setExpanded={setExpanded}
          index={index}
          key={index}
          onLearnMore={() => handleLearnMoreButtonClick(index)}
          query={candidate}
        />
      ))}
      <Box height="16px" />
    </Box>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
