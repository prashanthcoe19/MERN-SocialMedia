import React from 'react';
import PropTypes from 'prop-types';
import '../dashboard/dashboard.css';
const Post = ({ post: { text, photo } }) => {
  console.log(text);
  return (
    <div class='container px-4 py-5 mx-auto'>
      <div class='card cardm'>
        <div class='d-flex row-reverse justify-content-around'>
          <img class='image image1' src={`/uploads/${photo}`} />
        </div>
        <p>{text}</p>
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
