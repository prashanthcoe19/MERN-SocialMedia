import React from 'react';
import Navbar from './components/Navbar';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Register from './components/Register';
import Signin from './components/Signin';
import Profile from './components/Profile';

function App() {
  return (
    <div>
      {/* <Navbar /> */}
      <BrowserRouter>
        <Switch>
          <Route path='/register' component={Register} />
          <Route path='/login' component={Signin} />
          <Route path='/profile' component={Profile} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
