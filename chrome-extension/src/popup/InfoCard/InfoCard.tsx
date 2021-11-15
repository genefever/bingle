import React, { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from '@mui/material'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { fetchWikiData, WikiData } from '../../utils/api'

type InfoCardState = 'loading' | 'error' | 'ready'

const InfoCard: React.FC<{
  expanded: string | boolean
  setExpanded
  query: string
  onLearnMore?: () => void
  index: number
}> = ({ expanded, query, onLearnMore, index, setExpanded }) => {
  const [infoData, setInfoData] = useState<WikiData | null>(null)
  const [cardState, setCardState] = useState<InfoCardState>('loading')

  const handleExpandButtonClick =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      console.log('yeah')
      setExpanded(isExpanded ? panel : false)
    }

  useEffect(() => {
    fetchWikiData(query)
      .then((data) => {
        setInfoData(data)
        setCardState('ready')
      })
      .catch((err) => setCardState('error'))
  }, [query])

  // if (cardState == 'loading' || cardState == 'error') {
  //   return (
  //     <InfoCardContainer>
  //       <Typography variant="body1">
  //         {cardState == 'loading'
  //           ? 'Loading...'
  //           : 'Could not retrieve information for this query.'}
  //       </Typography>
  //     </InfoCardContainer>
  //   )
  // }

  return (
    <Accordion
      expanded={expanded === `panel${index}`}
      onChange={handleExpandButtonClick(`panel${index}`)}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography sx={{ width: '33%', flexShrink: 0 }}>
          Title
          {/* {infoData.name} */}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          {/* {infoData.main.temp} */} Description
        </Typography>
      </AccordionSummary>
      <AccordionDetails>Hi</AccordionDetails>

      {onLearnMore && (
        <Button onClick={onLearnMore} color="primary" size="small">
          Learn More
        </Button>
      )}
    </Accordion>
  )
}

export default InfoCard
