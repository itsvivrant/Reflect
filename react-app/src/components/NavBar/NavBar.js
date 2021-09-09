import React, {useState} from 'react';
import { NavLink, Link, Redirect, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import {login} from '../../store/session'
import LogoutButton from '../auth/LogoutButton';
import logoOne from '../NavBar/logo/logo-1.png'
import logoTwo from '../NavBar/logo/logo-2.png'

import './NavBar.css'

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user)
  const dispatch = useDispatch();
  const history = useHistory()


  const demoLogin = async(e) => {
    const email = 'demo@aa.io'
    const password = 'password'
    await dispatch(login( email, password))
    history.push('/')
  }



  return (
    <>
    {!sessionUser ?
    <nav className='nav-bar-container'>
      <div className='nav-logo'>
          <Link to='/'>
            <img className="logo" src={logoTwo} alt=''/>
          </Link>
      </div>
      <div className='nav-login-signup-container'>
          <button onClick={demoLogin} className='demo-bttn' type="submit">Demo Login</button>
          <NavLink to='/login' exact={true} id='login-nav'>
            Login
          </NavLink>
          <NavLink to='/sign-up' exact={true} id='signup-nav'>
            Sign Up
          </NavLink>


      </div>

    </nav> :

    <nav className='nav-bar-container'>
      {/* <div className='nav-logo'>
        <Link to='/'>
          <i className="fas fa-bars"></i>
        </Link>
      </div> */}
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
