import React, { useState, ChangeEvent, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { login } from '../store/auth';
import auth from '../services/auth';
import AuthContext from '../context/auth';

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useContext(AuthContext);

  const doSubmit = async () => {
    try {
      await auth.login(email, password);

      setUser(auth.getCurrentUser());
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    doSubmit();
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   dispatch(login(email, password));
  // };

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div className='container'>
      <form className='form-signin' onSubmit={handleSubmit}>
        <h1 className='h3 mb-3 font-weight-normal'>Please sign in</h1>
        <label htmlFor='inputEmail' className='sr-only'>
          Email address
        </label>
        <input
          type='email'
          id='inputEmail'
          className='form-control'
          placeholder='Email address'
          required
          autoFocus
          value={email}
          onChange={handleEmail}
        />
        <label htmlFor='inputPassword' className='sr-only'>
          Password
        </label>
        <input
          type='password'
          id='inputPassword'
          className='form-control'
          placeholder='Password'
          required
          value={password}
          onChange={handlePassword}
        />
        <button className='btn btn-lg btn-primary btn-block' type='submit'>
          Sign in
        </button>
      </form>
    </div>
  );
}

export default Login;
