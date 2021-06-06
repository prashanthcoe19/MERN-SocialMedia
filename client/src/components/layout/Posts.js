import React, { Fragment, useEffect } from 'react';
import { getPostByUser } from '../../actions/post';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Posts = ({ getPostByUser, posts }) => {
  useEffect(() => {
    getPostByUser();
  }, [getPostByUser]);
  return (
    <Fragment>
      <div class='d-flex row-reverse justify-content-around'>
        <div class='row'>
          {posts.map((post) => {
            return (
              <div class='col-sm-6 col-md-4'>
                <div class='thumbnail'>
                  <img
                    class='image image1'
                    src={`/uploads/${post.photo}`}
                  ></img>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPostByUser: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.post.posts,
});
export default connect(mapStateToProps, { getPostByUser })(Posts);
