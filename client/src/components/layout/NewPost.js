import React, { Fragment, useState } from 'react';
import { newPost } from '../../actions/post';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
const NewPost = ({ newPost }) => {
  const [show, setShow] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [text, setText] = useState();

  const handlePhoto = (e) => {
    setPhoto(e.target.files[0]);
  };

  const postSubmit = async (e) => {
    e.preventDefault();
    const newpost = new FormData();
    newpost.append('text', text);
    newpost.append('file', photo);
    console.log(text);
    newPost(newpost);
  };
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };
  return (
    <Fragment>
      <Button variant='edit-button' onClick={handleShow}>
        New Post <span />{' '}
        <i className='fa fa-plus-square' aria-hidden='true'></i>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='form' encType='multipart/form-data'>
            <div className='form-group'>
              {' '}
              <label className='form-control-label text-muted'>
                Description
              </label>{' '}
              <input
                type='text'
                id='text'
                name='text'
                placeholder='Description'
                className='form-control'
                value={text}
                onChange={(e) => {
                  const { value } = e.target;
                  setText(value);
                }}
              />{' '}
            </div>
            <div className='form-group'>
              {' '}
              <label className='form-control-label text-muted'>
                Upload New Photo
              </label>{' '}
              <input
                type='file'
                id='file'
                name='file'
                placeholder='Upload Image'
                className='form-control'
                onChange={handlePhoto}
              />{' '}
              <label>Choose file</label>
            </div>
            <div className='row justify-content-center my-3 px-3'>
              <button className='btn-block btn-color' onClick={postSubmit}>
                Submit
              </button>{' '}
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};
NewPost.propTypes = {
  newPost: PropTypes.func.isRequired,
};

export default connect(null, { newPost })(NewPost);
