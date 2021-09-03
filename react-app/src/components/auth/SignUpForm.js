import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

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
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>

      <div>
        <label>First Name</label>
        <input placeholder='First Name' type='text'name='first_name' onChange={updateFirst} value={first_name} ></input>
      </div>

      <div>
        <label>Last Name</label>
        <input placeholder='Last Name' type='text' name='last_name' onChange={updateLast} value={last_name} ></input>
      </div>

      <div>
        <label>User Name</label>
        <input type='text' name='username' onChange={updateUsername} value={username}></input>
      </div>

      <div>
        <label>Email</label>
        <input type='text' name='email' onChange={updateEmail} value={email}></input>
      </div>

      <div>
        <input placeholder="Date of Birth" type='date' name='DOB' onChange={updateDob} value={date_of_birth}></input>
      </div>

      <div>
        <label>Password</label>
        <input type='password' name='password' onChange={updatePassword} value={password}></input>
      </div>

      <div>
        <label>Repeat Password</label>
        <input type='password' name='repeat_password' onChange={updateRepeatPassword} value={repeatPassword} required={true} ></input>
      </div>

      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
