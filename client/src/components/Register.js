import React from 'react';

const Register = () => {
  return (
    <div class='container'>
      <div class='row'>
        <form>
          <div class='form-group'>
            <label>Name</label>
            <input
              type='email'
              class='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              placeholder='Enter email'
            />
          </div>
          <div class='form-group'>
            <label>Email</label>
            <input
              type='email'
              class='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              placeholder='Enter email'
            />
          </div>
          <div class='form-group'>
            <label>Password</label>
            <input
              type='email'
              class='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              placeholder='Enter email'
            />
          </div>
          <button type='submit' class='btn btn-primary my-1'>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
