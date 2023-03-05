import React from 'react';
// import PropTypes from 'prop-types';
import { auth } from './../firebase';
import Header from './Header';
import * as dbFunc from './DatabaseFunctions';

function UserController () {

  const makeProject = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const description = event.target.description.value; 
    const owner = auth.currentUser.uid;
    const invitations = ["this", "is", "where", "values", "will", "go"];
    console.log("will making a project give a return value? ", dbFunc.makeProject(owner, title, description, invitations));
  }
  
  return (
    <React.Fragment>
      <Header />
      <p>You have reached your account {auth.currentUser.email}</p>
      <h2>Add a project</h2>
      <form onSubmit={(e) => makeProject(e)}>
        <input></input>
      </form>
      
    </React.Fragment>
  );
}

export default UserController;

UserController.propTypes = {

}

