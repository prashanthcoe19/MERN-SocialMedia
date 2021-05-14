import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
// import Routes from './components/Routes/Routes';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Landing from './components/layout/Landing';
import store from './store';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
// import PrivateRoute from './components/Routes/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import setAuthToken from './utilities/setAuthToken';
import { loadUser } from './actions/auth';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/dashboard' component={Dashboard} />
          {/* <Route components={Routes} /> */}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
