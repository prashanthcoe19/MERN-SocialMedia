import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './signin.css';

const SignIn = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      history.push('/profile');
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    try {
      const { data } = await axios({
        method: 'post',
        url: '/api/auth/signin',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(user),
      });
      localStorage.setItem('authToken', data.token);
      history.push('/profile');
      setRedirect(true);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  if (redirect) {
    return <Redirect to={'/profile'} />;
  }

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
                  <label class='form-control-label text-muted'>
                    Email
                  </label>{' '}
                  <input
                    type='text'
                    id='email'
                    name='email'
                    placeholder='Phone no or email id'
                    class='form-control'
                    value={email}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />{' '}
                </div>
                <Link to='/profile' style={{ textDecoration: 'none' }}>
                  <div class='row justify-content-center my-3 px-3'>
                    {' '}
                    <button class='btn-block btn-color' onClick={loginHandler}>
                      Login to App
                    </button>{' '}
                  </div>
                </Link>
              </div>
            </div>
            <div class='bottom text-center mb-5'>
              <p class='sm-text mx-auto mb-3'>
                Don't have an account? <span />
                <Link to='/register' style={{ textDecoration: 'none' }}>
                  <button class='btn btn-white ml-2'>Create new</button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
