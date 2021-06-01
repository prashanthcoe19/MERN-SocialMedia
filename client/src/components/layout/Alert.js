import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alert }) => {
  alert.map((alert) => {
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg};
    </div>;
  });
};
Alert.PropTypes = {
  alerts: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => {
  alert: state.alert;
};

export default connect(mapStateToProps)(Alert);
