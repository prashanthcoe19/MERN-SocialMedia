// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import Spinner from '../layout/Spinner';

// const PrivateRoute = ({
//   component: Component,
//   isAuthenticated,
//   loading,
//   ...rest
// }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       loading ? (
//         <Spinner />
//       ) : isAuthenticated ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to='/login' />
//       )
//     }
//   />
// );

// // const PrivateRoute = (props) => {
// //   const {
// //     component: Component,
// //     auth: { isAuthenticated, loading },
// //     ...rest
// //   } = props;
// //   // const {isAuthenticated, loading} = props;
// //   return (
// //     <Route
// //       {...rest}
// //       render={(props) =>
// //         loading ? (
// //           <Spinner />
// //         ) : isAuthenticated ? (
// //           <Component {...props} />
// //         ) : (
// //           <Redirect to='/login'></Redirect>
// //         )
// //       }
// //     />
// //   );
// // };

// PrivateRoute.propTypes = {
//   isAuthenticated: PropTypes.bool,
//   loading: PropTypes.bool,
// };

// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth?.isAuthenticated,
//   loading: state.loading,
// });

// export default connect(mapStateToProps)(PrivateRoute);
