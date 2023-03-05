import React from 'react';
// import PropTypes from 'prop-types';
import { auth } from './../firebase';
import Header from './Header';

function UserController () {
  return (
    <React.Fragment>
      <Header />
      <p>You have reached your account {auth.currentUser.email}</p>
    </React.Fragment>
  );
}

export default UserController;

UserController.propTypes = {

}

