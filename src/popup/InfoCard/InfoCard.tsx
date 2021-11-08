import React, { useEffect, useState } from 'react'
import { Box, Card, CardContent, Typography } from '@material-ui/core'
import { fetchWikiData, WikiData } from '../../utils/api'

const InfoCardContainer: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <Box mx={'4px'} my={'16px'}>
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </Box>
  )
}

type InfoCardState = 'loading' | 'error' | 'ready'

const InfoCard: React.FC<{
  query: string
}> = ({ query }) => {
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

  if (cardState == 'loading' || cardState == 'error') {
    return (
      <InfoCardContainer>
        <Typography variant="body1">
          {cardState == 'loading'
            ? 'Loading...'
            : 'Could not retrieve information for this query.'}
        </Typography>
      </InfoCardContainer>
    )
  }

  return (
    <InfoCardContainer>
      <Typography variant="h5">{infoData.name}</Typography>
      <Typography variant="body1">{infoData.main.temp}</Typography>
      <Typography variant="body1">
        Feels like: {infoData.main.feels_like}
      </Typography>
    </InfoCardContainer>
  )
}

export default InfoCard
