import React from 'react'
import loadingGif from './resources/Rhombus.gif'

const Loading=  ()=> {
    return (
      <div className='text-center'>
        <img src={loadingGif} alt="Loading..." />
      </div>
    )
  }
  export default Loading;
