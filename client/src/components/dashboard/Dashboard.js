import React, { Fragment, useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { update } from '../../actions/auth';
import NewPost from '../layout/NewPost';
import polly from './polly.jpg';
import SOAD from './SOAD-Square_hi.jpg';
import toumas from './toumas.jpg';
import './dashboard.css';
import { Redirect } from 'react-router';
import axios from 'axios';
import { getPostByUser } from '../../actions/post';

const Dashboard = ({ update, user, isAuthenticated, posts, getPostByUser }) => {
  useEffect(() => {
    getPostByUser();
  }, [getPostByUser]);

  const [show, setShow] = useState(false);

  const [name, setName] = useState();
  const [bio, setBio] = useState();
  const [photo, setPhoto] = useState(null);

  // const onChange = (e) => {
  //   setformData({ ...formData, [e.target.name]: e.target.value });
  // };
  const handlePhoto = (e) => {
    // const photo = e.target.files[0];
    setPhoto(e.target.files[0]);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', name);
    data.append('bio', bio);
    data.append('file', photo);

    console.log(photo);
    // const { name, bio, photo } = newFormData;
    update(data);
  };
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  // useEffect(() => {
  //   loadUser();
  // }, [loadUser]);
  // console.log(user);
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
                    src={`/uploads/${user.photo}`}
                    style={{
                      objectFit: 'scale-down',
                      width: '100%',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      border: '2px solid transparent',
                      borderColor: 'silver',
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
                        value={name}
                        onChange={(e) => {
                          const { value } = e.target;
                          setName(value);
                        }}
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
                        value={bio}
                        onChange={(e) => {
                          const { value } = e.target;
                          setBio(value);
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
                {/* <Modal.Footer>
                  <Button variant='secondary' onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant='primary' onClick={handleClose}>
                    Save Changes
                  </Button>
                </Modal.Footer> */}
              </Modal>
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
  getPostByUser: PropTypes.func.isRequired,
  // newPost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  posts: state.post.posts,
});

export default connect(mapStateToProps, { update, getPostByUser })(Dashboard);
