import React from 'react'
import { NavLink } from 'react-router-dom'

export default function AdminMenu() {
  return (
    <>
      {/* <div className='text-center'>
        <div className="list-group">
          <h4>Admin Panel</h4>
          <NavLink to='/dashboard/carousel' className='list-group-item list-group-item-action'>Carousel</NavLink>
          <NavLink to='/dashboard/movies' className='list-group-item list-group-item-action'>Movies</NavLink>
          <NavLink to='/dashboard/series' className='list-group-item list-group-item-action'>Series</NavLink>
          <NavLink to='/dashboard/categories' className='list-group-item list-group-item-action'>Categories</NavLink>
        </div>
      </div> */}
      <div className="d-flex flex-column flex-shrink-0 bg-light" style="width: 4.5rem;">
        <a href="/" className="d-block p-3 link-dark text-decoration-none" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only">
          <svg className="bi" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
          <span className="visually-hidden">Icon-only</span>
        </a>
        <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
          <li className="nav-item">
            <a href="#" className="nav-link active py-3 border-bottom" aria-current="page" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">
              <svg className="bi" width="24" height="24" role="img" aria-label="Home"><use xlink:href="#home"></use></svg>
            </a>
          </li>
          <li>
            <a href="#" className="nav-link py-3 border-bottom" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Dashboard">
              <svg className="bi" width="24" height="24" role="img" aria-label="Dashboard"><use xlink:href="#speedometer2"></use></svg>
            </a>
          </li>
          <li>
            <a href="#" className="nav-link py-3 border-bottom" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Orders">
              <svg className="bi" width="24" height="24" role="img" aria-label="Orders"><use xlink:href="#table"></use></svg>
            </a>
          </li>
          <li>
            <a href="#" className="nav-link py-3 border-bottom" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Products">
              <svg className="bi" width="24" height="24" role="img" aria-label="Products"><use xlink:href="#grid"></use></svg>
            </a>
          </li>
          <li>
            <a href="#" className="nav-link py-3 border-bottom" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Customers">
              <svg className="bi" width="24" height="24" role="img" aria-label="Customers"><use xlink:href="#people-circle"></use></svg>
            </a>
          </li>
        </ul>
        <div className="dropdown border-top">
          <a href="#" className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle" id="dropdownUser3" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="mdo" width="24" height="24" className="rounded-circle" />
          </a>
          <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">
            <li><a className="dropdown-item" href="#">New project...</a></li>
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <li><a className="dropdown-item" href="#">Profile</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Sign out</a></li>
          </ul>
        </div>
      </div>
    </>
  )
}
