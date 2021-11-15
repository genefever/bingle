import React, { useEffect, useState, SetStateAction } from 'react'
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
  setExpanded: React.Dispatch<SetStateAction<string | boolean>>
  query: string
  onLearnMore?: () => void
  index: number
}> = ({ expanded, query, onLearnMore, index, setExpanded }) => {
  const [infoData, setInfoData] = useState<WikiData | null>(null)
  const [cardState, setCardState] = useState<InfoCardState>('loading')

  const handleExpandButtonClick =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
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

  if (cardState == 'loading' || cardState == 'error') {
    return (
      <Box mx={'4px'} my={'16px'}>
        <Typography variant="body1">
          {cardState == 'loading'
            ? 'Loading...'
            : 'Could not retrieve information for this query.'}
        </Typography>
      </Box>
    )
  }

  return (
    <Accordion
      expanded={expanded === `panel${index}`}
      onChange={handleExpandButtonClick(`panel${index}`)}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography sx={{ width: '50%', flexShrink: 0 }}>
          {infoData.name}
        </Typography>
        {/* <Typography sx={{ color: 'text.secondary' }}>
          
        </Typography> */}
      </AccordionSummary>
      <AccordionDetails>Hi</AccordionDetails>
      <AccordionDetails>
        {onLearnMore && (
          <Button
            onClick={onLearnMore}
            variant="contained"
            color="primary"
            size="small"
          >
            Learn More
          </Button>
        )}
      </AccordionDetails>
    </Accordion>
  )
}

export default InfoCard
