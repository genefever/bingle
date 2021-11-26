import React, { useState } from 'react'
import 'fontsource-roboto'
import InfoCard from '../InfoCard'

// Component that contains the 3 InfoCards.
const Popup: React.FC<{ candidates: any }> = ({ candidates }) => {
  // Expand the first panel by default.
  const [expanded, setExpanded] = useState<string | false>('panel0')

  return (
    <>
      {candidates.map((candidate, index) => (
        <InfoCard
          expanded={expanded}
          setExpanded={setExpanded}
          index={index}
          key={index}
          candidate={candidate}
        />
      ))}
    </>
  )
}

export default Popup
