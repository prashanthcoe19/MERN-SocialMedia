import React, { Fragment, useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { update } from '../../actions/auth';
import { loadUser } from '../../actions/auth';
import polly from './polly.jpg';
import SOAD from './SOAD-Square_hi.jpg';
import toumas from './toumas.jpg';
import './dashboard.css';
import { Redirect } from 'react-router';

const Dashboard = ({ update, auth: { user, isAuthenticated } }) => {
  const [show, setShow] = useState(false);
  const [formData, setformData] = useState({ name: '', bio: '', photo: '' });
  const { name, bio, photo } = formData;

  const onChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    setformData({ ...formData, photo: e.target.files[0] });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const newFormData = new FormData();
    newFormData.append('myImage', name);
    newFormData.append('bio', bio);
    newFormData.append('photo', photo);
    // const { name, bio, photo } = newFormData;
    update({ name, bio, photo });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // useEffect(() => {
  //   loadUser();
  // }, [loadUser]);

  if (isAuthenticated === null) {
    return <Redirect to='/login' />;
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
                    src={user && user.image}
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
              <Button
                // class='edit-button'
                variant='edit-button'
                onClick={handleShow}
              >
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
                      <label class='form-control-label text-muted'>
                        Name
                      </label>{' '}
                      <input
                        type='text'
                        id='name1'
                        name='name'
                        placeholder='Name'
                        class='form-control'
                        onChange={onChange}
                        value={name}
                      />{' '}
                    </div>
                    <div class='form-group'>
                      {' '}
                      <label class='form-control-label text-muted'>
                        Bio
                      </label>{' '}
                      <input
                        type='text'
                        id='name'
                        name='bio'
                        placeholder='Bio'
                        class='form-control'
                        onChange={onChange}
                        value={bio}
                      />{' '}
                    </div>
                    <div class='form-group'>
                      {' '}
                      <label class='form-control-label text-muted'>
                        Change Profile Image
                      </label>{' '}
                      <input
                        type='file'
                        id='name'
                        name='image'
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
                {/* <Modal.Footer>
                  <Button variant='secondary' onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant='primary' onClick={handleClose}>
                    Save Changes
                  </Button>
                </Modal.Footer> */}
              </Modal>
              <Button variant='edit-button'>
                New Post <span />{' '}
                <i class='fa fa-plus-square' aria-hidden='true'></i>
              </Button>
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
  // loadUser: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { update })(Dashboard);
