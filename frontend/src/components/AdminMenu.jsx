import React from 'react'
import { Link } from 'react-router-dom'

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
      <div className="d-flex flex-column flex-shrink-0 bg-light" style={{ width: "4.5rem" }}>
        <Link href="/" className="d-block p-3 link-dark text-decoration-none" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only">
          <svg className="bi" width="40" height="32"></svg>
          <span className="visually-hidden">Icon-only</span>
        </Link>
        <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
          <li className="nav-item">
            <Link href="#" className="nav-link active py-3 border-bottom" aria-current="page" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">
              <svg className="bi" width="24" height="24" role="img" aria-label="Home"></svg>
            </Link>
          </li>
          <li>
            <Link href="#" className="nav-link py-3 border-bottom" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Dashboard">
              <svg className="bi" width="24" height="24" role="img" aria-label="Dashboard"></svg>
            </Link>
          </li>
          <li>
            <Link href="#" className="nav-link py-3 border-bottom" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Orders">
              <svg className="bi" width="24" height="24" role="img" aria-label="Orders"></svg>
            </Link>
          </li>
          <li>
            <Link href="#" className="nav-link py-3 border-bottom" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Products">
              <svg className="bi" width="24" height="24" role="img" aria-label="Products"></svg>
            </Link>
          </li>
          <li>
            <Link href="#" className="nav-link py-3 border-bottom" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Customers">
              <svg className="bi" width="24" height="24" role="img" aria-label="Customers"></svg>
            </Link>
          </li>
        </ul>
        <div className="dropdown border-top">
          <Link href="#" className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle" id="dropdownUser3" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="mdo" width="24" height="24" className="rounded-circle" />
          </Link>
          <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">
            <li><Link className="dropdown-item" href="#">New project...</Link></li>
            <li><Link className="dropdown-item" href="#">Settings</Link></li>
            <li><Link className="dropdown-item" href="#">Profile</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><Link className="dropdown-item" href="#">Sign out</Link></li>
          </ul>
        </div>
      </div>
    </>
  )
}
