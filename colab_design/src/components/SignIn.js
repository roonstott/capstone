import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { auth, db } from "./../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";


function SignIn () {

  const [authorized, setAuthorized ] = useState(null);
  const [signUpMessage, setSignUpMessage] = useState(null); 

  function doSignUp(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSignUpMessage(`You are signed in as ${userCredential.email}`)
      })
      .catch((error) => {
        setSignUpMessage(`Sign up failed: ${error.message}`)
      })
  }

  

  return (
    <React.Fragment>
      <h1>Sign Up</h1>
    </React.Fragment>>
  );
}

export default SignIn;

SignIn.propTypes = {

}

