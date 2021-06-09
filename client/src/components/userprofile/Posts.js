import React, { Fragment, useEffect } from 'react';
import { getPostByUserId } from '../../actions/post';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Posts = ({ getPostByUserId, posts, id }) => {
  useEffect(() => {
    getPostByUserId(id);
  }, [getPostByUserId, id]);
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
  getPostByUserId: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.post.posts,
});

export default connect(mapStateToProps, { getPostByUserId })(Posts);
