import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { newsFeed } from '../../actions/post';
import Post from './Post';

const Newsfeed = ({ newsFeed, posts }) => {
  useEffect(() => {
    newsFeed();
  }, [newsFeed]);
  console.log(posts);
  return (
    <Fragment>
      {posts.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </Fragment>
  );
};

Newsfeed.propTypes = {
  newsFeed: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.post.posts,
});
export default connect(mapStateToProps, { newsFeed })(Newsfeed);
