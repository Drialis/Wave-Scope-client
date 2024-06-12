import React, { useEffect, useState } from 'react'
import { AiFillLike } from 'react-icons/ai'
import sightingServices from '../services/sighting.services'

const LikeButton = ({ sightingConfirmations, userId, sightingId, increaseConfirmations, decreaseConfirmations }) => {

  const [liked, setLiked] = useState(false)


  useEffect(() => {
    setLiked(sightingConfirmations.includes(userId))
  }, [])


  const handleConfirmations = () => {

    if (!sightingConfirmations.includes(userId)) {

      sightingServices
        .confirmSighting(sightingId)
        .then(() => {
          increaseConfirmations()
          setLiked(true)
        })
        .catch(err => console.log(err))

    } else {

      sightingServices
        .removeSightingConfirmation(sightingId)
        .then(() => {
          decreaseConfirmations()
          setLiked(false)
        })
        .catch(err => console.log(err))
    }
  }


  return (
    <AiFillLike
      color={liked ? "#023047" : "#C7EDFF"}
      size="25"
      onClick={handleConfirmations}
    />
  )
}

export default LikeButton