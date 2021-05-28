import React, { Fragment, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import DashboardActions from './DashboardActions';
import { loadUser } from '../../actions/auth';
import Navbar from '../layout/Navbar';
import '../dashboard/dashboard.css';

const Dashboard = ({ loadUser, post: { posts }, auth: { user } }) => {
  // useEffect(() => {
  //   loadUser();
  // }, [loadUser]);
  // console.log(user.name);
  return (
    <Fragment>
      <div class='container px-4 py-5 mx-auto'>
        <div class='card card0'>
          <div class='d-flex row-reverse justify-content-around'>
            <div class='p-2'>
              {/* when first render user array is empty and prop content does not
              exists so must check content first */}
              <h6 class='text-left user-name'>{user && user.name}</h6>
              <p>{posts && posts.post}</p>
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
  post: state.post,
});

export default connect(mapStateToProps, { loadUser })(Dashboard);
