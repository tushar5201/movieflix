import React from 'react'
import { NavLink } from 'react-router-dom'

export default function AdminMenu() {
  return (
    <>
      <div className='text-center'>
        <div className="list-group">
          <div>
            <p><Link to='/signup'>Create Account</Link></p>
            <p onClick={logoutHandler} style={{ color: "white", cursor: "pointer" }}>Logout</p>
          </div>
          <h4>Admin Panel</h4>
          <NavLink to='/dashboard/carousel' className='list-group-item list-group-item-action'>Carousel</NavLink>
          <NavLink to='/dashboard/movies' className='list-group-item list-group-item-action'>Movies</NavLink>
          <NavLink to='/dashboard/series' className='list-group-item list-group-item-action'>Series</NavLink>
          <NavLink to='/dashboard/categories' className='list-group-item list-group-item-action'>Categories</NavLink>
        </div>
      </div>
    </>
  )
}
