import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import '../private/dashboard.css';
import { comment, uncomment, addLike, removeLike } from '../../actions/post';
import { connect } from 'react-redux';
const Post = ({
  post: { text, photo, postedBy, likes, comments, _id },
  comment,
  uncomment,
  addLike,
  removeLike,
  user,
}) => {
  const [com, setCom] = useState();
  const handleChange = (e) => {
    setCom(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    comment(com, _id);
    setCom('');
  };

  // const like = (e) => {
  //   addLike(_id);
  // };
  // const deleteComment = (e) => {
  //   e.preventDefault();
  //   uncomment(com, _id);
  // };
  return (
    <div class='container px-4 py-5 mx-auto'>
      <div class='card cardm'>
        <div class='d-flex row-reverse justify-content-start align-items-center'>
          <div class='p-2'>
            <img
              class='rounded-circle rounded-photo'
              src={`/uploads/${postedBy.photo}`}
            />
          </div>
          <div class='p-2'>
            <h6>
              <strong>{postedBy.name}</strong>
            </h6>
          </div>
        </div>
        <div class='p-2'>
          <img class='image2 image1' src={`/uploads/${photo}`} />
        </div>
        <div class='d-flex row-reverse justify-content-start align-items-center'>
          <div class='p-1'>
            <i
              class='far fa-thumbs-up fa-2x'
              style={{ marginLeft: '8px' }}
              onClick={() => {
                addLike(_id);
              }}
            ></i>
            <i
              class='far fa-thumbs-down fa-2x'
              style={{ marginLeft: '8px' }}
              onClick={() => {
                removeLike(_id);
              }}
            ></i>
          </div>
          <div class='p-2'>
            <i class='far fa-comment fa-2x' style={{ marginLeft: '5px' }}></i>
          </div>
        </div>
        <div class='p-1' style={{ marginLeft: '8px' }}>
          <p>{likes && likes.length} likes</p>
        </div>
        <div class='d-flex row-reverse justify-content-start align-items-center'>
          <div class='p-2'>
            <p>
              <strong>{postedBy.name}</strong>
            </p>
          </div>
          <div class='p-2'>
            <p>{text}</p>
          </div>
        </div>{' '}
        <div class='p-2'>
          {/* <p>View all {comments && comments.length} comments</p> */}
          {comments.map((comment, i) => {
            return (
              <Fragment key={i}>
                <p key={i}>
                  <strong>{comment.postedBy.name}</strong> <span />{' '}
                  {comment.text} <span />{' '}
                  {comment.postedBy.id === user.id ? (
                    <i
                      class='fas fa-trash'
                      onClick={() => uncomment(_id, comment._id)}
                    ></i>
                  ) : null}
                </p>
              </Fragment>
            );
          })}
        </div>
        <div class='p-2'>
          <form className='form' onSubmit={handleSubmit}>
            <div class='form-group'>
              <input
                type='text'
                id='com'
                name='com'
                value={com}
                placeholder='Comment'
                onChange={handleChange}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  comment: PropTypes.func.isRequired,
  uncomment: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  comment,
  uncomment,
  addLike,
  removeLike,
})(Post);
