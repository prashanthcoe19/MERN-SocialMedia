import React, { Fragment, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../private/dashboard.css';
import { Button } from 'react-bootstrap';
import { getProfileById, unfollow, follow } from '../../actions/auth';
import Posts from './Posts';
import { getPostByUserId } from '../../actions/post';
import Spinner from '../layout/Spinner';

const UserProfile = ({
  profil,
  posts,
  match,
  getProfileById,
  getPostByUserId,
  user,
  loading,
  follow,
  unfollow,
}) => {
  useEffect(() => {
    getPostByUserId(match.params.id);
    getProfileById(match.params.id);
  }, [getProfileById, getPostByUserId, match.params.id]);
  const id = match.params.id;
  const followUser = () => {
    follow(id);
  };
  const unfollowUser = () => {
    unfollow(id);
  };

  // if (loading) return <Spinner />;

  if (user._id === match.params.id) {
    return <Redirect to='/dashboard' />;
  }
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
                    src={`/uploads/${profil.photo}`}
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
              <h6 class='text-left user-name'>{profil && profil.name}</h6>
              <p>{profil && profil.bio}</p>
              <p>
                {loading ? (
                  <Spinner />
                ) : user.following.length === 0 ? (
                  <Button variant='edit-button' onClick={followUser}>
                    Follow
                  </Button>
                ) : user.following.includes(match.params.id) ? (
                  <Button variant='edit-button' onClick={unfollowUser}>
                    Unfollow
                  </Button>
                ) : (
                  <Button variant='edit-button' onClick={followUser}>
                    Follow
                  </Button>
                )}
              </p>
            </div>
            <div class='p-2'>
              <h6 class='text-left user-name'>Posts</h6>
              <h6 class='text-left user-name'>{posts && posts.length}</h6>
            </div>
            <div class='p-2'>
              <h6 class='text-left user-name'>Following</h6>
              <h6 class='text-left user-name'>
                {profil.following && profil.following.length}
              </h6>
            </div>
            <div class='p-2'>
              <h6 class='text-left user-name'>Followers</h6>
              <h6 class='text-left user-name'>
                {profil.followers && profil.followers.length}
              </h6>
            </div>
          </div>
          <Posts id={match.params.id} />
        </div>
      </div>
    </Fragment>
  );
};

UserProfile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  getPostByUserId: PropTypes.func.isRequired,
  follow: PropTypes.func.isRequired,
  unfollow: PropTypes.func.isRequired,
  profil: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  profil: state.profile.profil,
  posts: state.post.posts,
  user: state.auth.user,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, {
  getProfileById,
  getPostByUserId,
  follow,
  unfollow,
})(UserProfile);
