import React from 'react';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [credential, setCredential] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/api/loginuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert('Enter Valid Details');
    } else {
      // Only navigate if login is successful
      localStorage.setItem('userEmail', credential.email);
      localStorage.setItem('authToken', json.authToken);
      navigate('/');
    }
  };

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='exampleInputEmail1'>Email address</label>
            <input
              type='email'
              className='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              placeholder='Enter email'
              name='email'
              value={credential.email}
              onChange={onChange}
            />
            <small id='emailHelp' className='form-text text-muted'>
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className='mb-3'>
            <label htmlFor='exampleInputPassword1'>Password</label>
            <input
              type='password'
              className='form-control'
              id='exampleInputPassword1'
              placeholder='Password'
              name='password'
              value={credential.password}
              onChange={onChange}
            />
          </div>

          <button type='submit' className='m-3 btn btn-primary'>
            Submit
          </button>
          <Link to='/signup' className='m-3 btn btn-danger'>
            Create a New User
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
