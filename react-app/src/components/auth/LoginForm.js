import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

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
    <div className='login-page-container'>
        <div className='login-pic-container'>
          <img src="https://i.imgur.com/cFj3GCm.png" />
        </div>
        <div className='login-form-page'>
          <div className='login-form'>
            <form className='user-login-info' onSubmit={onLogin}>
              <div lassName="login-validations-container">
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
              <div className='login-info-inputs'>
                <label htmlFor='email'>Email</label>
                <input name='email' type='text' placeholder='Email' value={email} onChange={updateEmail} />
              </div>
              <div className='login-info-inputs'>
                <label htmlFor='password'>Password</label>
                <input name='password' type='password' placeholder='Password' value={password} onChange={updatePassword} />
              </div>
              <div className='signup-redirect'>
                <p>Don't have an account? <a href='/sign-up'>Sign up here</a></p>
              </div>
            </form>
            <form onSubmit={onLogin}>
              <button type='submit' className='submit-entry-bttn'>Login</button>
            </form>

          </div>
        </div>
    </div>
  );
};

export default LoginForm;
