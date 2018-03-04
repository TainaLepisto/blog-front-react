import React from 'react'

const Info = ({ message }) => {
  if (message === '') {
    return null
  }
  return (
    <div className="info">
      {message}
    </div>
  )
}

export default Info
