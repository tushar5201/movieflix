import React from 'react'
import { Spinner } from 'react-bootstrap'

export default function LoadingBox() {
  return (
    <div>
      {/* <Spinner animation='border' variant='danger' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner> */}
      <div class="lds-hourglass"></div>
    </div>
  )
}
