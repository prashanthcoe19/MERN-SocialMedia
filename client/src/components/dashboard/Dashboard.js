import React, { Fragment, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import DashboardActions from './DashboardActions';
import { loadUser } from '../../actions/auth';
import Navbar from '../layout/Navbar';
import './dashboard.css';

const Dashboard = ({ loadUser, auth: { user } }) => {
  // useEffect(() => {
  //   loadUser();
  // }, [loadUser]);
  // console.log(user.name);
  return (
    // <Fragment>
    //   <Navbar />
    //   <h1 className='large text-primary'>Dashboard</h1>
    //   <p className='lead'>
    //     <i className='fas fa-user' /> Welcome {user && user.name}
    //   </p>
    // </Fragment>
    // </Fragment>
    <Fragment>
      <div class='container px-4 py-5 mx-auto'>
        <div class='card card0'>
          <div class='d-flex row-reverse justify-content-around'>
            <div class='p-2' style={{ padding: '0px !important' }}>
              <h3 class='text-left heading'>
                <span class='fa fa-user-circle' />
              </h3>
              {/* when first render user array is empty and prop content does not
              exists so must check content first */}
              <h6 class='text-left user-name'>{user && user.name}</h6>
              <p>{user && user.bio}</p>
              <button class='edit-button'>
                <i class='fas fa-edit'></i>
              </button>
            </div>

            <div class='p-2'>
              <h6 class='text-left user-name'>Posts</h6>
              <h6 class='text-left user-name'>333</h6>
            </div>

            <div class='p-2'>
              <h6 class='text-left user-name'>Following</h6>
              <h6 class='text-left user-name'>
                {user.following && user.following.length}
              </h6>
            </div>

            <div class='p-2'>
              <h6 class='text-left user-name'>Followers</h6>
              <h6 class='text-left user-name'>
                {user.followers && user.followers.length}
              </h6>
            </div>
          </div>
          {/* <div class='p-2'>
            <button class='edit-button'>Edit Profile</button>
          </div> */}
        </div>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  // loadUser: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(Dashboard);
