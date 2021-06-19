import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Logout from './Logout';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { searchUsers } from '../../actions/auth';
import Spinner from './Spinner';
const Navbar = ({ isAuthenticated, searchUsers, profiles, loading }) => {
  const [text, setText] = useState('');

  const search = async (e) => {
    e.preventDefault();
    searchUsers(text);
  };
  if (loading) return <Spinner />;
  const authLinks = (
    <Fragment>
      <div class='p-2'>
        <Link to='/newsfeed' style={{ textDecoration: 'none' }}>
          <a class='navbar-brand' href='#'>
            Social Media App
          </a>
        </Link>
      </div>
      <ul class='navbar-nav'>
        <li class='nav-item' style={{ marginRight: '10px' }}>
          <form className='form' onSubmit={search}>
            <div className='form-group'>
              <input
                type='text'
                name='text'
                id='text'
                placeholder='Search Users...'
                value={text}
                onChange={(e) => {
                  const { value } = e.target;
                  setText(value);
                }}
              />
            </div>
          </form>
        </li>{' '}
        <span />
        <li class='nav-item' style={{ marginRight: '10px' }}>
          <Link to='/dashboard'>
            <Button variant='edit-button'>
              <i class='fas fa-user' style={{ textDecoration: 'none' }}>
                {' '}
                <span />
                Profile
              </i>
            </Button>
          </Link>
        </li>{' '}
        <span />
        <li class='nav-item' style={{ marginRight: '10px' }}>
          <Link to='/newsfeed'>
            <Button variant='edit-button'>
              <i class='fas fa-home' style={{ textDecoration: 'none' }}>
                {' '}
                <span />
                News Feed
              </i>
            </Button>
          </Link>
        </li>{' '}
        <span />
        <li class='nav-item' style={{ marginRight: '10px' }}>
          <Logout />
        </li>
      </ul>
    </Fragment>
  );
  const guestLinks = (
    <div class='p-2'>
      <Link to='/newsfeed' style={{ textDecoration: 'none' }}>
        <a class='navbar-brand' href='#'>
          Social Media App
        </a>
      </Link>
    </div>
  );
  return (
    <div class='container px-4 py-5 mx-auto'>
      <div class='card cardm'>
        <nav class='navbar navbar-expand-lg navbar-dark bg-dark fixed-top'>
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        </nav>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  searchUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  profiles: state.profile.profiles,
  profiles: state.profile.loading,
});

export default connect(mapStateToProps, { searchUsers })(Navbar);
