import React from 'react';
// import PropTypes from 'prop-types';
import { auth } from "./../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import SignUp from './SignUp.js';
import PopUpSignIn from './PopUpSignIn.js';

class SignIn extends React.Component {
  constructor(props) {  
    super(props);
    this.state = {
      signInSuccess: "", 
      signUpSuccess: "",
      showSignUp: false      
    }
  }

  // const [authorized, setAuthorized ] = useState(null);

  showSignUp = (bool) => {
    this.setState({
      showSignUp: bool,
      signInSuccess: "",
      signUpSuccess: ""
    });
  }

  handleSignUp = (e, p, c) => {
    console.log("handleSignUp");
    if(p !== c) {
      this.setState({
        signUpSuccess: "'Password' and 'Confirm Password' do not match"
      });
    } else {
      createUserWithEmailAndPassword(auth, e, p)
        .then((userCredential) => {
          this.setState({
            signUpSuccess: `You've successfully signed up, ${userCredential.user.email}!`,
            showSignUp: false, 
            signInSuccess: ""
          });
        })
        .catch((error) => {
          this.setState({
            signUpSuccess: `There was an error signing up: ${error.message}!`
          });
        });
    }
  }

  resetSignUp = () => {
    this.setState({
      signUpSuccess: ""
    })
  }

  doSignIn = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        this.setState({
          signInSuccess: `Successfully signed in as ${userCredential.user.email}`,
          signUpSuccess: ""
        });          
      })
      .catch((error) => {
        this.setState({
          signInSuccess: `Error signing in: ${error.message}`,
          signUpSuccess: ""
        });
      });
  }  

 render() {
    if(this.state.showSignUp === true) {
      return (
        <SignUp onSignUp={this.handleSignUp} message={this.state.signUpSuccess} tryAgain={this.resetSignUp}/>
      )
      
    } else {
      return (
        <React.Fragment>
          <div>
            <h1>Sign In</h1>
            <p>{this.state.signUpSuccess}</p>
            <p>{this.state.signInSuccess}</p>
            <form onSubmit={(e) => this.doSignIn(e)}>
              <label htmlFor="email">Email Address</label>
              <input type="text" name="email" placeholder='Email Address' />
              <label htmlFor="password">Password</label>
              <input type="text" name="password" placeholder='Password' />
              <button type="submit">Sign In</button>
            </form>
            <button onClick={() => this.showSignUp(true)}>Create a new account</button>
          </div>
          <PopUpSignIn message={this.state.signInSuccess} />        
        </React.Fragment>
      )
    }
  }
}

export default SignIn;

// SignIn.propTypes = {

// }

