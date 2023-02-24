import React from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import SignIn from './SignIn';
import UserController from './UserController';

function App () {

  
  return (
    <React.Fragment>
      <Logo />
      <SignIn />
      <UserController />
    </React.Fragment>
  );
}

export default App;

App.propTypes = {

}

