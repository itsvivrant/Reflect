import React from 'react';
import { NavLink, Link} from 'react-router-dom';
import {useSelector} from 'react-redux'
import LogoutButton from '../auth/LogoutButton';
import logo from '../NavBar/reflect-logo.png'

import './NavBar.css'

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user)

  return (
    <>
    {!sessionUser ?
    <nav className='nav-bar-container'>
      <div className='nav-logo'>
          <Link to='/'>
            <img className="logo" src={logo} alt=''/>
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
          <img className="logo" src={logo} alt=''/>
        </Link>
      </div>
      <div className='user-logout-container'>
        <div className='user-icon'>
          <i class="fas fa-portrait"></i>
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
