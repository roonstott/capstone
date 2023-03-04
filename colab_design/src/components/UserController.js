import React from 'react';
// import PropTypes from 'prop-types';
import { auth } from './../firebase';

function UserController () {
  return (
    <p>You have reached your account {auth.currentUser.email}</p>
  );
}

export default UserController;

UserController.propTypes = {

}

