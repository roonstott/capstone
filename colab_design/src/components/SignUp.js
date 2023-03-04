import React from 'react';
// import PropTypes from 'prop-types';
// import { auth } from "../firebase.js";


function SignUp (props) {

  function doSignUp(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;   
    props.onSignUp(email, password, confirmPassword)    
  }       

  const reset = () => {
    props.tryAgain();
    document.getElementById("popUp").close();
  }

  const popUp = () => {
    if(props.message !== "") {
      document.getElementById("popUp").showModal();
    }
  }

  const goToLogIn = () => {
    props.goToLogIn();
  }

  const button = () => {
    if(props.success) {
      return (
        <button type="click" onClick={() => goToLogIn()}>Go To Log In</button>
      )
    } else {
      return (
        <button type="click" onClick={() => reset()}>Try Again</button>
      )
    }
  }  

  return (
    <React.Fragment>
      <h1>Create An Account</h1>
      <form onSubmit={(e) => doSignUp(e)}>
        <label htmlFor="email">Email Address</label>
        <input type="text" name="email" placeholder='Email'></input>
        <label htmlFor="password">Password</label>
        <input type="text" name="password" placeholder='Password'></input>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="text" name="confirmPassword" placeholder='Confirm Password'></input>
        <button type="submit">Register</button>
      </form>
      <dialog id="popUp">
        <p>{props.message}</p>
        {button()}
      </dialog>
      {popUp()}
      <button type="click" onClick={() => props.goToLogIn()}>Back To Log In Page</button>
    </React.Fragment>
  )
}

export default SignUp;

// SignUp.propTypes = {

// }

