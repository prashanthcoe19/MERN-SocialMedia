import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { update } from '../../actions/auth';
import '../private/dashboard.css';

const EditProfile = ({ update, username, userbio }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState(username);
  const [bio, setBio] = useState(userbio);
  const [photo, setPhoto] = useState(null);
  const handlePhoto = (e) => {
    setPhoto(e.target.files[0]);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', name);
    data.append('bio', bio);
    data.append('file', photo);

    update(data);
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
        Edit Profile <span />
        <i class='fas fa-edit'></i>
      </Button>{' '}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='form' encType='multipart/form-data'>
            <div class='form-group'>
              {' '}
              <label class='form-control-label text-muted'>Name</label>{' '}
              <input
                type='text'
                id='name1'
                name='name'
                placeholder='Name'
                class='form-control'
                defaultValue={username}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />{' '}
            </div>
            <div class='form-group'>
              {' '}
              <label class='form-control-label text-muted'>Bio</label>{' '}
              <input
                type='text'
                id='name'
                name='bio'
                placeholder='Bio'
                class='form-control'
                defaultValue={userbio}
                onChange={(e) => {
                  setBio(e.target.value);
                }}
              />{' '}
            </div>
            <div class='form-group'>
              {' '}
              <label class='form-control-label text-muted'>
                Change Profile Image
              </label>{' '}
              <input
                type='file'
                id='file'
                name='file'
                placeholder='Upload Image'
                class='form-control'
                onChange={handlePhoto}
              />{' '}
              <label>Choose file</label>
            </div>
            <div class='row justify-content-center my-3 px-3'>
              <button class='btn-block btn-color' onClick={onSubmit}>
                Submit
              </button>{' '}
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};
EditProfile.propTypes = {
  update: PropTypes.func.isRequired,
};

// const mapStateToProps = (state) => {
//   return {
//     user: state.auth.user,
//   };
// };
export default connect(null, { update })(EditProfile);
