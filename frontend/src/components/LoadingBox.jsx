import React from 'react'
import { Spinner } from 'react-bootstrap'

export default function LoadingBox() {
  return (
    <Spinner animation='border' variant='danger' role='status'>
        <span className='visually-hidden'>Loading...</span>
    </Spinner>
  )
}
