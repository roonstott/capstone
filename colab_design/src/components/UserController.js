import React from 'react';
// import PropTypes from 'prop-types';
import { auth } from './../firebase';
import Header from './Header';
import * as dbFunc from './DatabaseFunctions';
import UserRecentProj from './UserRecentProj';

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

