import React, { Fragment, useState } from 'react';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';

const Logout = ({ logout }) => {
  const [show, setShow] = useState(false);

  const handleLogout = () => {
    logout();
    setShow(false);
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
        Logout <span />
        <i class='fas fa-sign-out-alt'></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to log out of your account?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleLogout}>
            Yes
          </Button>
          <Button variant='primary' onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(Logout);
