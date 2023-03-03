import React from 'react';
import Logo from './Logo';
import SignIn from './SignIn';
// import UserController from './UserController';
// import { auth } from './../firebase';

function App () {

  // let display; 

  // if (auth.currentUser === null) {
  //   display = <SignIn />
  // } else if (auth.currentUser !== null) {
  //   display = <UserController />
  // }

  
  return (
    <React.Fragment>
      <Logo />
      <SignIn />
    </React.Fragment>
  );
}

export default App;

App.propTypes = {

}

