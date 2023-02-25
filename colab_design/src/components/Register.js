import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { auth } from "./../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";


function Register () {

  const [authorized, setAuthorized ] = useState(null);
  const [registerMessage, setRegisterMessage] = useState(null); 

  function doRegister(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;    
    if (password !== confirmPassword) {
      setRegisterMessage("'Password' and 'Confirm Password' do not match")
    } else {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setRegisterMessage(`Registration success! You are signed in as ${userCredential.email}`)
      })
      .catch((error) => {
        setRegisterMessage(`Sign up failed: ${error.message}`)
      })  
    }
  }       

  return (
    <React.Fragment>
      <h1>Create An Account</h1>
      {registerMessage}
      <form onSubmit={() => doRegister()}>
        <label for="email">Email Address</label>
        <input type="text" name="email" placeholder='Email'></input>
        <label for="password">Password</label>
        <input type="text" name="password" placeholder='Password'></input>
        <label for="confirmPassword">Confirm Password</label>
        <input type="text" name="confirmPassword" placeholder='Confirm Password'></input>
        <button type="submit">Register</button>
      </form>
    </React.Fragment>
  )
}

export default Register;

// Register.propTypes = {

// }

