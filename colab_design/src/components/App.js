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

  console.log(auth.currentUser.uid)

  return (
      <div className="bg-gradient-to-r from-zinc-200 to-lime-100 h-screen">
        <Logo />
        {display}
      </div>
  );
}

export default App;

App.propTypes = {

}

