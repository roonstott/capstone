import React from 'react';
// import PropTypes from 'prop-types';
import { auth } from "./../firebase.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import SignUp from './SignUp.js';
import * as dbFunc from './DatabaseFunctions';



class SignIn extends React.Component {
  constructor(props) {  
    super(props);
    this.state = {
      signInMessage: "", 
      signUpMessage: "",
      signUpSuccess: false,
      signInSuccess: false,
      showSignUp: false      
    }
  }


  showSignUp = () => {
    this.setState({
      showSignUp: true,
      signInMessage: "",
      signUpMessage: ""
    });
  }

  handleSignUp = (e, p, c, first, last) => {
    if(p !== c) {
      this.setState({
        signUpMessage: "'Password' and 'Confirm Password' do not match",
      });
    } else {
      createUserWithEmailAndPassword(auth, e, p)
        .then((userCredential) => {
          this.setState({
            signUpMessage: `You've successfully signed up, ${userCredential.user.email}!`,
            signInMessage: "", 
            signUpSuccess: true
          });
          dbFunc.makeUser(userCredential.user.uid, e, first, last);          
        })
        .catch((error) => {
          this.setState({
            signUpMessage: `There was an error signing up: ${error.message}!`
          });
        });
    }
  }

  resetSignUp = () => {
    this.setState({
      signUpMessage: ""
    })
  }

  doSignIn = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        this.setState({
          signInMessage: `Successfully signed in as ${userCredential.user.email}`,
          signUpMessage: "",
          signInSuccess: true
        });  
      })
      .catch((error) => {
        this.setState({
          signInMessage: `Error signing in: ${error.message}`,
          signUpMessage: ""
        });
      });
  }

  popUp = () => {
    if(this.state.signInMessage !== "") {
      document.getElementById("popUp").showModal();
    }    
  }

  goToAccount = () => {
    this.setState({
      signInMessage: "",
      signUpMessage: "",
      signInSuccess: false,
      signUpSuccess: false, 
      showSignUp: false
    });
    document.getElementById("popUp").close();
    this.props.setCurrentUser(auth.currentUser);
  }

  resetSignIn = () => {
    this.setState({
      signInMessage: "",
      signUpMessage: "",
      signInSuccess: false,
      signUpSuccess: false,      
      showSignUp: false
    });
    document.getElementById("popUp").close();
  }

  button = () => {
    if(this.state.signInSuccess) {
      return (
        <button className="bg-red-300 border-slate-400 rounded px-4 py-1" type="click" onClick={() => this.goToAccount()}>Go To Your Account</button>
      )
    } else {
      return (
        <button className="bg-red-300 border-slate-400 rounded px-4 py-1" type="click" onClick={() => this.resetSignIn()}>Try Again</button>
      )
    }
  }

 render() {
    if(this.state.showSignUp === true) {
      return (
        <SignUp onSignUp={this.handleSignUp} message={this.state.signUpMessage} tryAgain={this.resetSignUp} success={this.state.signUpSuccess} goToLogIn={this.resetSignIn}/>
      )
      
    } else {
      return (
        <React.Fragment>
          <div className='flex justify-center basis-3/4'>
            <div className="flex flex-col basis-3/4 py-6 justify-center">
              <h1 className="text-orange-600 text-center py-6">Sign In</h1>            
              <form className='flex flex-col py-6' onSubmit={(e) => this.doSignIn(e)}>
                <label htmlFor="email">Email Address</label>
                <input type="text" name="email" placeholder='Email Address' />
                <label htmlFor="password">Password</label>
                <input type="text" name="password" placeholder='Password' />
                <button className="bg-red-300 border-slate-400 rounded px-4 py-1 w-40" type="submit">Sign In</button>
              </form>
              <button className="bg-red-300 border-slate-400 rounded px-4 py-1 w-40" onClick={() => this.showSignUp()}>Create a new account</button>
            </div>
          </div>
          <dialog id="popUp">
            <p>{this.state.signInMessage}</p>
            {this.button()}
          </dialog>
          {this.popUp()}
        </React.Fragment>
      )
    }
  }
}

export default SignIn;

// SignIn.propTypes = {

// }

