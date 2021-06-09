import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import NotFound from '../layout/NotFound';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../private/Dashboard';
import NewsFeed from '../layout/Newsfeed';
import UserProfile from '../userprofile/UserProfile';

const Routes = (props) => {
  return (
    <section className='container'>
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profile/:id' component={UserProfile} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/newsfeed' component={NewsFeed} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
