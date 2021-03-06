import React from 'react';
import { Link, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import {login} from '../../store/session'
import LogoutButton from '../auth/LogoutButton';
import Profile from './Profile';

import logoTwo from '../NavBar/logo/logo-2.png'

import './NavBar.css'

const EntriesNav = ({setShowSideBar, showSideBar}) => {
  const dispatch = useDispatch();
  const history = useHistory()


  const demoLogin = async(e) => {
    const email = 'demo@aa.io'
    const password = 'password'
    await dispatch(login( email, password))
    history.push('/')
  }

  // () => showSideBar ? setShowSideBar(false) : setShowSideBar(true)

  return (
    <>
    <nav className='entries-nav-bar-container'>
      <div className='nav-logo'>
          <i onClick={showSideBar} className="fas fa-bars"></i>
      </div>
      <div className='nav-logo'>
          <Link to='/'>
            <img className="logo" src={logoTwo} alt=''/>
          </Link>
      </div>
      <div className='user-logout-container'>
        <div className='user-icon'>
          <Profile />
        </div>
      </div>



    </nav>
    </>
  );
}

export default EntriesNav;
