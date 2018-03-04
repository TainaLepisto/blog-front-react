import React from 'react'

const Info = ({ message, type }) => {
  if (message === '') {
    return null
  }
  return (
    <div className={type}>
      {message}
    </div>
  )
}

export default Info
