import React,{ useState, useEffect } from 'react'

const Alert = ({type ,msg ,removeAlert, list }) => {

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert()
    },2000)
    return () => clearTimeout(timeout);
  },[list])

  return (
    <div>
      <h3 className={`text-center text-sm rounded-lg ${type} mb-2 shadow-sm `}>{msg}</h3>
    </div>
  )
}

export default Alert;
