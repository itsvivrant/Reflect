import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

import './Auth.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
    <NavBar />
    <div className='login-page-container'>
        <div className='login-pic-container'>
          <img src="https://i.imgur.com/cFj3GCm.png" alt='login pic' />
        </div>
        <div className='login-form-page'>
          <div className='login-form'>
            <form className='user-login-info' onSubmit={onLogin}>
              <div className='login-info-inputs'>
                <label htmlFor='email'>Email</label>
                <input name='email' type='text' placeholder='Email' value={email} onChange={updateEmail} required={true}/>
                {errors.length > 0 &&
                <p className='errors_message'>
                  {errors[0].email}
                </p>
              }
              </div>
              <div className='login-info-inputs'>
                <label htmlFor='password'>Password</label>
                <input name='password' type='password' placeholder='Password' value={password} onChange={updatePassword} required={true}/>
                {errors.length > 0 &&
                <p className='errors_message'>
                  {errors[0].password}
                </p>
              }
              </div>
              <div className='signup-redirect'>
                <p>Don't have an account? <a className='signup-link' href='/sign-up'>Sign up here</a></p>
              </div>
            </form>
            <form onSubmit={onLogin}>
              <button type='submit' className='submit-entry-bttn'>Login</button>
            </form>

          </div>
        </div>
    </div>
    <Footer />
    </>
  );
};

export default LoginForm;
