import React, { Fragment, useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NewPost from '../layout/NewPost';
import EditProfile from '../layout/EditProfile';
import './dashboard.css';
import { Redirect } from 'react-router';
import { getPostByUser } from '../../actions/post';
import Posts from '../layout/Posts';
import Spinner from '../layout/Spinner';

const Dashboard = ({
  user,
  isAuthenticated,
  posts,
  getPostByUser,
  loading,
}) => {
  useEffect(() => {
    getPostByUser();
  }, [getPostByUser]);
  if (isAuthenticated === false) {
    return <Redirect to='/login' />;
  }
  if (loading) return <Spinner />;
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
                    src={`/uploads/${user.photo}`}
                    style={{
                      objectFit: 'scale-down',
                      width: '50px',
                      height: '60px',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      border: '2px solid transparent',
                      borderColor: 'silver',
                    }}
                  ></img>
                </div>
              </div>
              {/* when first render user array is empty and prop content does not
              exists so must check content first */}
              <h6 class='text-left user-name'>{user && user.name}</h6>
              <p>{user && user.bio}</p>
              <EditProfile username={user.name} userbio={user.bio} />
              <NewPost />
            </div>
            <div class='p-2'>
              <h6 class='text-left user-name'>Posts</h6>
              <h6 class='text-left user-name'>{posts && posts.length}</h6>
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
          <Posts />
        </div>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getPostByUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  posts: state.post.posts,
  loading: state.post.loading,
});

export default connect(mapStateToProps, { getPostByUser })(Dashboard);
