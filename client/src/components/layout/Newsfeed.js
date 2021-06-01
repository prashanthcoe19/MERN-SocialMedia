import React, { Fragment, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import DashboardActions from './DashboardActions';
import { loadUser } from '../../actions/auth';
import { Button, Modal } from 'react-bootstrap';
import Navbar from '../layout/Navbar';
import '../dashboard/dashboard.css';
import polly from '../dashboard/polly.jpg';
// import { updateProfile } from '../../actions/auth';
import axios from 'axios';
const Newsfeed = ({}) => {
  const [show, setShow] = useState(false);
  const [formData, setformData] = useState({ name: '', bio: '' });
  const { name, bio } = formData;

  const onChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let body = { name, bio };
    let res = await axios.put('/api/users', body);
    console.log(res.data);
    // updateProfile(res);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // if (isAuthenticated === null) {
  //   return <Redirect to='/login' />;
  // }
  return (
    <Fragment>
      <div class='container px-4 py-5 mx-auto'>
        <div class='card cardm'>
          <div class='d-flex row-reverse justify-content-around'>
            <div
              class='p-2'
              style={{ padding: '0px !important', width: '250px' }}
            >
              {/* <h6 class='text-left user-name'>{user && user.name}</h6>
              <p>{posts && posts.post}</p> */}
              <div class='card' style={{ width: '18rem' }}>
                <div class='card-body'>
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
                      <div className='form'>
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
                        <div class='row justify-content-center my-3 px-3'>
                          <button
                            class='btn-block btn-color'
                            onClick={onSubmit}
                          >
                            Submit
                          </button>{' '}
                        </div>
                      </div>
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
                  {/* <p class='card-text'>{user && user.name}</p> */}
                </div>
                <img class='card-img-top' src={polly} alt='Card image cap' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Newsfeed.propTypes = {
  // loadUser: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(Newsfeed);
