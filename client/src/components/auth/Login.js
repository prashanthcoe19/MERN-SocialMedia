import React, { useState, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import '../signin.css';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
  };
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <div class='container px-4 py-5 mx-auto'>
        <div class='card card0'>
          <div class='d-flex justify-content-center'>
            <div class='card card1'>
              <div class='row justify-content-center my-auto'>
                <div class='col-md-8 col-10 my-5'>
                  <h3 class='mb-5 text-center heading'>
                    <span class='fa fa-user-circle' />
                  </h3>
                  <h6 class='msg-info'>Please login to your account</h6>
                  <div className='form'>
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
                        onChange={onChange}
                        value={email}
                        required
                      />{' '}
                    </div>
                    <div class='form-group'>
                      {' '}
                      <label class='form-control-label text-muted'>
                        Password
                      </label>{' '}
                      <input
                        type='password'
                        id='inputpassword1'
                        name='password'
                        placeholder='Password'
                        class='form-control'
                        onChange={onChange}
                        value={password}
                        required
                      />{' '}
                    </div>
                    <Link to='/dashboard' style={{ textDecoration: 'none' }}>
                      <div class='row justify-content-center my-3 px-3'>
                        <button class='btn-block btn-color' onClick={onSubmit}>
                          Login to App
                        </button>{' '}
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div class='bottom text-center mb-5'>
                <p class='sm-text mx-auto mb-3'>
                  Do not have an account? <span />
                  <Link to='/register' style={{ textDecoration: 'none' }}>
                    <button class='btn btn-white ml-2'>Register</button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
