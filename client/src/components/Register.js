import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { create } from '../api/api-user';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    const user = {
      name: name,
      email: email,
      password: password,
    };
    create(user)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div class='container px-4 py-5 mx-auto'>
      <div class='card card0'>
        <div class='d-flex justify-content-center'>
          <div class='card card1'>
            <div class='row justify-content-center my-auto'>
              <div class='col-md-8 col-10 my-5'>
                <h3 class='mb-5 text-center heading'>
                  We are social media app
                </h3>
                <h6 class='msg-info'>Please login to your account</h6>
                <div class='form-group'>
                  {' '}
                  <label class='form-control-label text-muted'>Name</label>{' '}
                  <input
                    type='text'
                    id='name'
                    name='email'
                    placeholder='Name'
                    class='form-control'
                    onChange={(e) => setName(e.target.value)}
                  />{' '}
                </div>
                <div class='form-group'>
                  {' '}
                  <label class='form-control-label text-muted'>
                    Email
                  </label>{' '}
                  <input
                    type='text'
                    id='email'
                    name='email'
                    placeholder='Phone no or email id'
                    class='form-control'
                    onChange={(e) => setEmail(e.target.value)}
                  />{' '}
                </div>
                <div class='form-group'>
                  {' '}
                  <label class='form-control-label text-muted'>
                    Password
                  </label>{' '}
                  <input
                    type='password'
                    id='psw'
                    name='psw'
                    placeholder='Password'
                    class='form-control'
                    onChange={(e) => setPassword(e.target.value)}
                  />{' '}
                </div>
                <Link to='/profile' style={{ textDecoration: 'none' }}>
                  <div class='row justify-content-center my-3 px-3'>
                    {' '}
                    <button class='btn-block btn-color' onClick={handleSubmit}>
                      Register
                    </button>{' '}
                  </div>
                </Link>
              </div>
            </div>
            <div class='bottom text-center mb-5'>
              <p class='sm-text mx-auto mb-3'>
                Already Have An Account? <span />
                <Link to='/login' style={{ textDecoration: 'none' }}>
                  <button class='btn btn-white ml-2'>Sign In</button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
