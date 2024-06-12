import React, { useEffect, useState } from 'react'
import { AiFillDislike } from 'react-icons/ai'
import sightingServices from '../services/sighting.services'

const DislikeButton = ({ sightingRejections, userId, sightingId, increaseRejections, decreaseRejections }) => {

  const [disliked, setDisliked] = useState(false)

  useEffect(() => {
    setDisliked(sightingRejections.includes(userId))
  }, [])


  const handleRejections = () => {

    if (!sightingRejections.includes(userId)) {

      sightingServices
        .rejectSighting(sightingId)
        .then(() => {
          increaseRejections()
          setDisliked(true)
        })
        .catch(err => console.log(err))

    } else {

      sightingServices
        .removeSightingRejection(sightingId)
        .then(() => {
          decreaseRejections()
          setDisliked(false)
        })
        .catch(err => console.log(err))
    }
  }


  return (
    <AiFillDislike
      color={disliked ? "#023047" : "#C7EDFF"}
      size="25"
      onClick={handleRejections} />
  )

}

export default DislikeButton