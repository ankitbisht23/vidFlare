import React from 'react'

const Loading = ({isLoading}) => {
  if(!isLoading) return null;
  return(
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}

export default Loading
