import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { auth } from "./../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import SignUp from './SignUp.js';


function SignIn () {

  const [authorized, setAuthorized ] = useState(null);
  const [signInMessage, setSignInMessage] = useState(null);
  // const [showSignUp, setShowSignUp] = useState(false);
  const showSignUp = true;

  function doSignIn(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSignInMessage(`Successfully signed in as ${userCredential.user.email}`)        
      })
      .catch((error) => {
        setSignInMessage(`Error signing in: ${error.message}`)
      })
  }  

  if (showSignUp === false) {
    return (
      <React.Fragment>
        <div>
          <h1>Sign In</h1>
          {signInMessage}
          <form onSubmit={() => doSignIn()}>
            <label htmlFor="email">Email Address</label>
            <input type="text" name="email" placeholder='Email Address' />
            <label htmlFor="password">Password</label>
            <input type="text" name="password" placeholder='Password' />
            <button type="submit">Sign In</button>
          </form>
          {/* <button onClick={() => setShowSignUp(true)}>Create a new account</button> */}
        </div>
      </React.Fragment>
    )
  } else {
    return (
      <SignUp/>
    )
  }   
}

export default SignIn;

// SignIn.propTypes = {

// }

