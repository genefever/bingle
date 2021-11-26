import React, { useEffect, useState } from 'react'
import 'fontsource-roboto'
import InfoCard from '../InfoCard'
import { WikiData } from '../../utils/api'
import { MessageType } from '../../utils/types'
import { fetchWikiData } from '../../utils/api'

const Popup: React.FC<{ candidates: any }> = ({ candidates }) => {
  // Expand the first panel by default.
  const [expanded, setExpanded] = useState<string | false>('panel0')

  // const handleLearnMoreButtonClick = (index: number) => {
  //   // TODO open Wikipedia page based on link at index
  //   console.log(index)
  // }

  // useEffect(() => {
  //   // Get message from background.ts to update isActive
  //   chrome.runtime.onMessage.addListener((message: MessageType) =>
  //     handleMessage(message)
  //   )

  //   // Remove listener when this component unmounts
  //   return () => {
  //     chrome.runtime.onMessage.removeListener(handleMessage)
  //   }
  // }, [])

  // const handleMessage = (message: MessageType) => {
  //   window.alert('yea')
  //   if (message.type === 'SET_QUERY') {
  //     fetchWikiData(message.query).then((data) => {
  //       setCandidates(data)
  //     })
  //     // setCandidates(fetchWikiData(message.query))
  //     // setCandidates(message.candidates)
  //   }
  // }

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
