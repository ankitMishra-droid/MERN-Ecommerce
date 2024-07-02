import React from 'react'
import { useParams } from 'react-router-dom'

const HomeProductCategory = () => {
    const params = useParams()
  return (
    <div>
        {
            params.categoryNames
        }
    </div>
  )
}

export default HomeProductCategory
