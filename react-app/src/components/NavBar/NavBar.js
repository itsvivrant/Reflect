import React from 'react';
import { NavLink, Link} from 'react-router-dom';
import {useSelector} from 'react-redux'
import LogoutButton from '../auth/LogoutButton';
import logoOne from '../NavBar/logo/logo-1.png'
import logoTwo from '../NavBar/logo/logo-2.png'

import './NavBar.css'

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user)

  return (
    <>
    {!sessionUser ?
    <nav className='nav-bar-container'>
      <div className='nav-logo'>
          <Link to='/'>
            <img className="logo" src={logoOne} alt=''/>
          </Link>
      </div>
      <div className='nav-login-signup-container'>
        <div className='nav-login'>
          <NavLink to='/login' exact={true} activeClassName='active'>
            <button className='login-bttn'>Login</button>
          </NavLink>
        </div>
        <div className='nav-signup'>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            <button className='signup-bttn'>Sign Up</button>
          </NavLink>
        </div>
      </div>
    </nav> :

    <nav className='nav-bar-container'>
      <div className='nav-logo'>
        <Link to='/'>
          <i className="fas fa-bars"></i>
        </Link>
      </div>
      <div className='nav-logo'>
          <Link to='/'>
            <img className="logo" src={logoTwo} alt=''/>
          </Link>
      </div>
      <div className='user-logout-container'>
        <div className='user-icon'>
          <i className="fas fa-portrait"></i>
        </div>
        <div>
          <LogoutButton />
        </div>
      </div>



    </nav>}
    </>
  );
}

export default NavBar;
