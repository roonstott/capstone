import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { auth } from "./../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import SignUp from './SignUp.js';


class SignIn extends React.Component {
  constructor(props) {  
    super(props);
    this.state = {
      signInSuccess: "", 
      signUpSuccess: "",
      showSignUp: false      
    }
  }

  setShowSignUp = () => {
    this.setState({
      showSignUp: true
    });
  }

  setSignInMessage = (m) => {
    this.setState({
      signInMessage: m
    })
  }

  // const [authorized, setAuthorized ] = useState(null);

  doSignIn = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        this.setSignInMessage(`Successfully signed in as ${userCredential.user.email}`)        
      })
      .catch((error) => {
        this.setSignInMessage(`Error signing in: ${error.message}`)
      })
  }  

 render() {
    if(this.state.showSignUp === true) {
      return (
        <SignUp />
      )
      
    } else {
      return (
        <React.Fragment>
          <div>
            <h1>Sign In</h1>
            {this.state.signInMessage}
            <form onSubmit={() => this.doSignIn()}>
              <label htmlFor="email">Email Address</label>
              <input type="text" name="email" placeholder='Email Address' />
              <label htmlFor="password">Password</label>
              <input type="text" name="password" placeholder='Password' />
              <button type="submit">Sign In</button>
            </form>
            <button onClick={() => this.setShowSignUp(true)}>Create a new account</button>
          </div>
        </React.Fragment>
      )
    }
  }
}

export default SignIn;

// SignIn.propTypes = {

// }

