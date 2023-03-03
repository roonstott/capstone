import React from 'react';
// import PropTypes from 'prop-types';
// import { auth } from "../firebase.js";


function SignUp (props) {

  function doSignUp(event) {
    event.preventDefault();
    const email = event.target.email.value;
    console.log(email);
    const password = event.target.password.value;
    console.log(password); 
    const confirmPassword = event.target.confirmPassword.value;   
    console.log(confirmPassword);
    props.onSignUp(email, password, confirmPassword)    
  }       

  return (
    <React.Fragment>
      <h1>Create An Account</h1>
      <p>{props.message}</p>
      <form onSubmit={(e) => doSignUp(e)}>
        <label htmlFor="email">Email Address</label>
        <input type="text" name="email" placeholder='Email'></input>
        <label htmlFor="password">Password</label>
        <input type="text" name="password" placeholder='Password'></input>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="text" name="confirmPassword" placeholder='Confirm Password'></input>
        <button type="submit">Register</button>
      </form>
    </React.Fragment>
  )
}

export default SignUp;

// SignUp.propTypes = {

// }

