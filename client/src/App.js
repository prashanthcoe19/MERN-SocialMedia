import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
// import Routes from './components/Routes/Routes';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Landing from './components/layout/Landing';
// import Newsfeed from './components/layout/Newsfeed';
import store from './store';
// import Login from './components/auth/Login';
// import Register from './components/auth/Register';
// import PrivateRoute from './components/Routes/PrivateRoute';
// import Dashboard from './components/private/Dashboard';
import setAuthToken from './utilities/setAuthToken';
import { loadUser } from './actions/auth';
import Navbar from './components/layout/Navbar';
import Routes from './components/Routes/Routes';
import { LOG_OUT } from './actions/types';

const App = () => {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOG_OUT });
    });
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route component={Routes} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
