import React, { Component } from 'react'
import loadingGif from './resources/Rhombus.gif'

export default class Loading extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={loadingGif} alt="Loading..." />
      </div>
    )
  }
}
