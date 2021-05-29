import React, { Fragment, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import DashboardActions from './DashboardActions';
import { loadUser } from '../../actions/auth';
import Navbar from '../layout/Navbar';
import '../dashboard/dashboard.css';
import polly from '../dashboard/polly.jpg';

const Newsfeed = ({
  loadUser,
  post: { posts },
  auth: { user, isAuthenticated },
}) => {
  // if (isAuthenticated === null) {
  //   return <Redirect to='/login' />;
  // }
  return (
    <Fragment>
      <div class='container px-4 py-5 mx-auto'>
        <div class='card cardm'>
          <div class='d-flex row-reverse justify-content-around'>
            <div
              class='p-2'
              style={{ padding: '0px !important', width: '250px' }}
            >
              {/* <h6 class='text-left user-name'>{user && user.name}</h6>
              <p>{posts && posts.post}</p> */}
              <div class='card' style={{ width: '18rem' }}>
                <div class='card-body'>
                  <p class='card-text'>{user && user.name}</p>
                </div>
                <img class='card-img-top' src={polly} alt='Card image cap' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Newsfeed.propTypes = {
  // loadUser: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, { loadUser })(Newsfeed);
