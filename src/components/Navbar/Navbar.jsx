import React from 'react';
import './Navbar.css';
import logo from '../../assets/logo3.jpg';
// /assets/logo3.jpg
import navprofile from '../../assets/nav-profile.svg';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='nav-content'>
         <img src={logo} alt='navlogo' className='nav-logo'/>
          <div className='content'>
          <h3>Blog</h3>
          <p>Admin Panel</p>
          </div>
      </div>

        <img  src={navprofile} alt='navprofile' className='nav-profile'/>
    </div>
  )
}

export default Navbar;
