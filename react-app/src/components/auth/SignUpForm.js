import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import Footer from '../Footer/Footer'
import './Auth.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [first_name, setFirst] = useState('');
  const [last_name, setLast] = useState('');
  const [date_of_birth, setDob] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, first_name, last_name, date_of_birth));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateFirst = (e) => {
    setFirst(e.target.value);
  };

  const updateLast = (e) => {
    setLast(e.target.value);
  };

  const updateDob = (e) => {
    setDob(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
    <div className='signup-container'>
      <div className='signup-form-page'>
        <div className='signup-form' >
          <div className='signup-header'>
            <h1>Join Reflect</h1>
            <h3>Start Journaling Today</h3>
          </div>

  `        <form onSubmit={onSignUp}>
            <div className='signup-inputs'>
              <label>First Name</label>
              <input placeholder='First Name' type='text'name='first_name' onChange={updateFirst} value={first_name} required={true}  ></input>
              {errors.length > 0 &&
                <p className='errors_message'>
                  {errors[0].first_name}
                </p>
              }
            </div>

            <div className='signup-inputs'>
              <label>Last Name</label>
              <input placeholder='Last Name' type='text' name='last_name' onChange={updateLast} value={last_name} required={true} ></input>
              {errors.length > 0 &&
                <p className='errors_message'>
                  {errors[0].last_name}
                </p>
              }
            </div>

            <div className='signup-inputs'>
              <label>User Name</label>
              <input type='text' name='username' onChange={updateUsername} value={username} required={true} ></input>
              {errors.length > 0 &&
                <p className='errors_message'>
                  {errors[0].username}
                </p>
              }
            </div>

            <div className='signup-inputs'>
              <label>Email</label>
              <input type='text' name='email' onChange={updateEmail} value={email} required={true} ></input>
              {errors.length > 0 &&
                <p className='errors_message'>
                  {errors[0].email}
                </p>
              }
            </div>

            <div className='signup-inputs'>
              <label>Date Of Birth</label>
              <input placeholder="Date of Birth" type='date' name='DOB' onChange={updateDob} value={date_of_birth} required={true} ></input>
              {errors.length > 0 &&
                <p className='errors_message'>
                  {errors[0].date_of_birth}
                </p>
              }
            </div>

            <div className='signup-inputs'>
              <label>Password</label>
              <input type='password' name='password' onChange={updatePassword} value={password} required={true} ></input>
              {errors.length > 0 &&
                <p className='errors_message'>
                  {errors[0].password}
                </p>
              }
            </div>

            <div className='signup-inputs'>
              <label>Repeat Password</label>
              <input type='password' name='repeat_password' onChange={updateRepeatPassword} value={repeatPassword} required={true} ></input>
              {errors.length > 0 &&
                <p className='errors_message'>
                  {errors[0].repeatPassword}
                </p>
              }
            </div>

          </form>`
          <form onSubmit={onSignUp}>
              <button type='submit' className='submit-entry-bttn signup-bttn'>Sign Up</button>
            </form>

          </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default SignUpForm;
