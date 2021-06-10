import React, { Fragment, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
// import { loadUser } from '../../actions/auth';

const Follow = ({ followId, id }) => {
  //   useEffect(() => {
  //     loadUser();
  //   }, []);
  return (
    <Fragment>
      {id === followId ? <Button>unfollow</Button> : <Button>Follow</Button>}
    </Fragment>
  );
};

// Follow.propTypes = {
//   user: PropTypes.array.isRequired,
//   //   loadUser: PropTypes.func.isRequired,
// };

// const mapStateToProps = (state) => ({
//   user: state.auth.user,
//   loading: state.auth.user,
// });

export default Follow;
