import React, { useState, SetStateAction } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from '@mui/material'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { WikiData } from '../../utils/api'

type InfoCardState = 'loading' | 'error' | 'ready'

const InfoCard: React.FC<{
  expanded: string | boolean
  setExpanded: React.Dispatch<SetStateAction<string | boolean>>
  candidate: WikiData | null
  onLearnMore?: () => void
  index: number
}> = ({ expanded, candidate, onLearnMore, index, setExpanded }) => {
  // const [cardState, setCardState] = useState<InfoCardState>('loading')

  const handleExpandButtonClick =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  // Open Wikipedia page based on link at index
  const handleLearnMoreButtonClick = () => {
    // TODO
    console.log(candidate.url)
  }

  // if (cardState == 'loading' || cardState == 'error') {
  //   return (
  //     <Box mx={'4px'} my={'16px'}>
  //       <Typography variant="body1">
  //         {cardState == 'loading' || candidate == null
  //           ? 'Loading...'
  //           : 'Could not retrieve information for this query.'}
  //       </Typography>
  //     </Box>
  //   )
  // }

  return (
    <Accordion
      disableGutters
      expanded={expanded === `panel${index}`}
      onChange={handleExpandButtonClick(`panel${index}`)}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography sx={{ width: '50%', flexShrink: 0 }}>
          {candidate ? candidate.title : 'Loading...'}
        </Typography>
      </AccordionSummary>
      {candidate && (
        <>
          <AccordionDetails>{candidate.description}</AccordionDetails>
          <AccordionDetails>
            <Button
              style={{
                color: '#2196f3',
                backgroundColor: 'transparent',
                padding: 0,
              }}
              onClick={handleLearnMoreButtonClick}
              size="small"
            >
              Learn More
            </Button>
          </AccordionDetails>
        </>
      )}
    </Accordion>
  )
}

export default InfoCard
