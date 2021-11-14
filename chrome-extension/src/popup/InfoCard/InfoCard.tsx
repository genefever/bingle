import React, { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core'
import { ExpandMore } from '@mui/icons-material'
import { fetchWikiData, WikiData } from '../../utils/api'

const InfoCardContainer: React.FC<{
  children: React.ReactNode
  expanded: boolean
  key: number
  onExpand?: (panel: string) => void
  onLearnMore?: () => void
}> = ({ children, onLearnMore, onExpand, expanded, key }) => {
  return (
    <Box mx={'4px'} my={'16px'}>
      <Accordion expanded={expanded} onChange={() => onExpand(`panel${key}`)}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          {children}
        </AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>
      {/* <Card>
        <CardContent>{children}</CardContent>
        <CardActions>
          {onLearnMore && (
            <Button onClick={onLearnMore} color="primary" size="small">
              Learn More
            </Button>
          )}
        </CardActions> 
      </Card>*/}
    </Box>
  )
}

type InfoCardState = 'loading' | 'error' | 'ready'

const InfoCard: React.FC<{
  expanded: boolean
  key: number
  query: string
  onExpand: (panel: string) => void
  onLearnMore?: () => void
}> = ({ expanded, query, onExpand, onLearnMore, key }) => {
  const [infoData, setInfoData] = useState<WikiData | null>(null)
  const [cardState, setCardState] = useState<InfoCardState>('loading')

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
    <InfoCardContainer
      expanded={expanded}
      key={key}
      onExpand={onExpand}
      onLearnMore={onLearnMore}
    >
      <Typography variant="h5">{infoData.name}</Typography>
      <Typography variant="body1">{infoData.main.temp}</Typography>
      <Typography variant="body1">
        Feels like: {infoData.main.feels_like}
      </Typography>
    </InfoCardContainer>
  )

  // return (
  //   <InfoCardContainer onLearnMore={onLearnMore}>
  //     <Typography variant="h5">{infoData.name}</Typography>
  //     <Typography variant="body1">{infoData.main.temp}</Typography>
  //     <Typography variant="body1">
  //       Feels like: {infoData.main.feels_like}
  //     </Typography>
  //   </InfoCardContainer>
  // )
}

export default InfoCard
