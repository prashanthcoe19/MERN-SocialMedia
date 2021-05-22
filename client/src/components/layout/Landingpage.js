import React, { Fragment } from 'react';
import './Landing.css';
const Landingpage = () => {
  return (
    <Fragment>
      <div>
        <div class='header'>
          <div class='wrapper'>
            <form class='loginuser'>
              <table id='login'>
                <tr>
                  <td>
                    <label>Email</label>{' '}
                  </td>
                  <td>
                    <label>Password</label>
                  </td>
                  <td rowSpan='3'>
                    <input type='submit' value='Log In' id='loginbutton' />
                  </td>
                </tr>

                <tr>
                  <td>
                    <input type='text' id='email' class='inputtext' required />
                  </td>
                  <td>
                    <input
                      type='password'
                      id='logpassword'
                      class='inputtext'
                      required
                    />
                  </td>
                </tr>

                <tr>
                  <td></td>
                  <td>
                    <a>Forgot password?</a>
                  </td>
                </tr>
              </table>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Landingpage;
