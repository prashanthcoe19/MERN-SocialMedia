import React from 'react';
import PropTypes from 'prop-types';
import Logout from './Logout';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
const Navbar = ({ user, logout }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    logout();
  };
  return (
    <div class='container px-4 py-5 mx-auto'>
      <div class='card cardm'>
        <nav class='navbar navbar-expand-lg navbar-dark bg-dark fixed-top'>
          <div class='p-2'>
            <Link to='/newsfeed' style={{ textDecoration: 'none' }}>
              <a class='navbar-brand' href='#'>
                Social Media App
              </a>
            </Link>
          </div>

          <ul class='navbar-nav'>
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
              <Logout />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Navbar);
