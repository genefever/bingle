import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import 'fontsource-roboto'
import InfoCard from '../InfoCard'

const Popup: React.FC<{}> = () => {
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
    <>
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
    </>
  )
}

export default Popup
