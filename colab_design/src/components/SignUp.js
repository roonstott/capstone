import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { auth } from "../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";


function SignUp () {

  const [signUpMessage, setSignUpMessage] = useState(null); 

  function doSignUp(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;    
    if (password !== confirmPassword) {
      setSignUpMessage("'Password' and 'Confirm Password' do not match")
    } else {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSignUpMessage(`Registration success! You are signed in as ${userCredential.email}`)
      })
      .catch((error) => {
        setSignUpMessage(`Sign up failed: ${error.message}`)
      })  
    }
  }       

  return (
    <React.Fragment>
      <h1>Create An Account</h1>
      {signUpMessage}
      <form onSubmit={() => doSignUp()}>
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

export default SignUp;

// SignUp.propTypes = {

// }

