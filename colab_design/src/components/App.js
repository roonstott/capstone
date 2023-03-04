import React, { useState } from 'react';
import Logo from './Logo';
import SignIn from './SignIn';
import { auth } from './../firebase';
import UserController from './UserController';

function App () {

  const [currentUser, setCurrentUser] = useState(auth.currentUser)

  let display;
  if (currentUser === null) {
    display = <SignIn setCurrentUser={setCurrentUser}/>
  } else if (currentUser !== null) {
    display = <UserController />
  }

  return (
    <React.Fragment>
      <Logo />
      {display}
    </React.Fragment>
  );
}

export default App;

App.propTypes = {

}

