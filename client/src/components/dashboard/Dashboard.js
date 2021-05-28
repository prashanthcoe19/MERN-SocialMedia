import React, { Fragment, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import DashboardActions from './DashboardActions';
import { loadUser } from '../../actions/auth';
import Navbar from '../layout/Navbar';

import polly from './polly.jpg';
import SOAD from './SOAD-Square_hi.jpg';
import toumas from './toumas.jpg';
import './dashboard.css';

const Dashboard = ({ loadUser, auth: { user } }) => {
  return (
    <Fragment>
      <div class='container px-4 py-5 mx-auto'>
        <div class='card cardm'>
          <div class='d-flex row-reverse justify-content-around'>
            <div
              class='p-2'
              style={{ padding: '0px !important', width: '250px' }}
            >
              <div class='col-sm-6 col-md-4'>
                <div class='thumbnail'>
                  <img
                    class='rounded-circle'
                    src={polly}
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  ></img>
                </div>
              </div>
              {/* </div> */}
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
          <div class='d-flex row-reverse justify-content-around'>
            <div class='row'>
              <div class='col-sm-6 col-md-4'>
                <div class='thumbnail'>
                  <img class='image image1' src={polly}></img>
                </div>
              </div>
              <div class='col-sm-6 col-md-4'>
                <div class='thumbnail'>
                  <img class='image image1' src={SOAD}></img>
                </div>
              </div>
              <div class='col-sm-6 col-md-4'>
                <div class='thumbnail'>
                  <img class='image image1' src={toumas}></img>
                </div>
              </div>
              <div class='col-sm-6 col-md-4'>
                <div class='thumbnail'>
                  <img class='image image1' src={toumas}></img>
                </div>
              </div>
              <div class='col-sm-6 col-md-4'>
                <div class='thumbnail'>
                  <img class='image image1' src={SOAD}></img>
                </div>
              </div>
              <div class='col-sm-6 col-md-4'>
                <div class='thumbnail'>
                  <img class='image image1' src={polly}></img>
                </div>
              </div>
            </div>
          </div>
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
