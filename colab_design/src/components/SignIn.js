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
          <h1 className='text-center my-8 text-xl'>Welcome To The Colab Hub</h1>
          <div className='flex justify-center basis-3/4'>            
            <div className="grid grid-cols-1 justify-items-center w-2/3 my-6 p-6 justify-center bg-zinc-50 shadow-xl">
              <h1 className="text-cyan-700 text-center text-xl py-2">Sign In</h1>            
              <form className='py-2' onSubmit={(e) => this.doSignIn(e)}>
                <div>
                  <label className='my-1' htmlFor="email">Email Address</label>
                  <input className='m-2 px-2 py-1 outline outline-blue-200 hover:drop-shadow-md rounded-sm' type="text" name="email" placeholder='Email Address' />
                </div>
                <div>
                  <label className='m-2' htmlFor="password">Password</label>
                  <input className='m-2 px-2 py-1 outline outline-blue-200 hover:drop-shadow-md rounded-sm' type="text" name="password" placeholder='Password' />
                </div>
                <div className='flex justify-center'>
                  <button className="justify-center bg-cyan-500 opacity-90 border-slate-400 rounded px-4 my-4 py-1 px-8 w-fit hover:drop-shadow-xl" type="submit">Sign In</button>
                </div>
                <p className='my-3'>- OR -</p>
              </form>
              <button className="bg-slate-300 border-slate-400 rounded px-4 my-3 p-1 w-fit hover:drop-shadow-xl" onClick={() => this.showSignUp()}>Create a new account</button>
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

