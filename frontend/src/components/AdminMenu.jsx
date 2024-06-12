import React from 'react'
import { NavLink } from 'react-bootstrap'

export default function AdminMenu() {
  return (
    <>
      <div className='text-center'>
        <div className="list-group">
          <h4>Admin Panel</h4>
          <NavLink href='/dashboard/carousel' className='list-group-item list-group-item-action'>Carousel</NavLink>
          <NavLink href='/dashboard/movies' className='list-group-item list-group-item-action'>Movies</NavLink>
          <NavLink href='/dashboard/series' className='list-group-item list-group-item-action'>Series</NavLink>
          <NavLink href='/dashboard/categories' className='list-group-item list-group-item-action'>Categories</NavLink>
        </div>
      </div>
    </>
  )
}
