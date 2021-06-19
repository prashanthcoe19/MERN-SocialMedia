import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import { connect } from 'react-redux';
import { listUsers } from '../../actions/auth';

const Search = ({ profiles, loading }) => {
  console.log(profiles);
  if (loading) return <Spinner />;
  return (
    <div class='container'>
      {profiles.map((profile) => {
        <h1>{profile.name}</h1>;
      })}
    </div>
  );
};

Search.propTypes = {
  profiles: PropTypes.array.isRequired,
  listUsers: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  profiles: state.profile.profiles,
  loading: state.profile.loading,
});

export default connect(mapStateToProps, { listUsers })(Search);
