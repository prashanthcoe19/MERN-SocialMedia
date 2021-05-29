import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../signin.css';

const Landing = ({ isAuthenticated }) => {
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
                  <h6 class='msg-info'>Welcome to Social Media App</h6>
                  <p class='msg-info'>
                    Create a profile, share photos, make friends
                  </p>
                </div>
                <div class='bottom text-center mb-5'>
                  <Link to='/register' style={{ textDecoration: 'none' }}>
                    <button class='btn btn-white ml-2'>Register</button>
                  </Link>
                  <span />{' '}
                  <Link to='/login' style={{ textDecoration: 'none' }}>
                    <button class='btn btn-white ml-2'>Login</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
