import React, { SetStateAction } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from '@mui/material'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { WikiData } from '../../utils/api'
import './InfoCard.css'

// Compenent that displays the WikiData.
const InfoCard: React.FC<{
  expanded: string | boolean
  setExpanded: React.Dispatch<SetStateAction<string | boolean>>
  candidate: WikiData | null
  index: number
}> = ({ expanded, candidate, index, setExpanded }) => {
  // Toggle InfoCard expand / contract.
  const handleExpandButtonClick =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  // Open Wikipedia URL in a new tab when user clicks "Learn More".
  const handleLearnMoreButtonClick = () => {
    window.open(candidate.url, '_blank').focus()
  }

  // Truncate and append ellipsis to the input string if longer than length.
  const truncate = (input: string, length: number) => {
    if (input.length > length) {
      return input.substring(0, length) + '...'
    }
    return input
  }

  return (
    <Accordion
      disableGutters
      expanded={expanded === `panel${index}`}
      onChange={handleExpandButtonClick(`panel${index}`)}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography
          className="infoCard-title"
          sx={{ width: '50%', flexShrink: 0 }}
        >
          {candidate ? truncate(candidate.title, 40) : 'Loading...'}
        </Typography>
      </AccordionSummary>
      {candidate && (
        <>
          <AccordionDetails>
            <Typography className="infoCard-body">
              {candidate.description}
            </Typography>
          </AccordionDetails>
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
              <Typography className="infoCard-body">Learn More</Typography>
            </Button>
          </AccordionDetails>
        </>
      )}
    </Accordion>
  )
}

export default InfoCard
