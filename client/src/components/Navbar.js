import React from 'react';
import ImgSena from '../assets/img/sena.jpg';

const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">
                <img src={ImgSena} alt="Logo" width="60" height="60" className="d-inline-block align-text-top" />
            </a>
        </div>
    </nav>
  )
}

export default Navbar;