import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Box } from '@material-ui/core'
import 'fontsource-roboto'
import './popup.css'
import InfoCard from './InfoCard'

const App: React.FC<{}> = () => {
  const [expanded, setExpanded] = useState<boolean>(false)
  const [candidates, setCandidates] = useState<string[]>([
    'Toronto',
    'New York',
    'Sunnyvale',
  ])

  const handleLearnMoreButtonClick = (index: number) => {
    // TODO open Wikipedia page based on link at index
    console.log(index)
  }

  const handleExpandButtonClick = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <Box mx="8px" my="16px">
      {candidates.map((candidate, index) => (
        <InfoCard
          expanded={expanded}
          key={index}
          onExpand={() => handleExpandButtonClick(`panel${index}`)}
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
