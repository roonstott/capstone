import React from 'react';
// import PropTypes from 'prop-types';
import { auth } from './../firebase';
import Header from './Header';
import * as dbFunc from './DatabaseFunctions';

function UserController () {

  const makeProject = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const description = event.target.description.value; 
    const owner = auth.currentUser.uid;
    const invitations = ["nhfJIOdGgEfD5drhwEIbVHtjnnM2"];
    dbFunc.makeProject(owner, title, description, invitations);
  }
  
  return (
    <React.Fragment>
      <Header />
      <p>You have reached your account {auth.currentUser.email}</p>
      <h2>Add a project</h2>      
      <form onSubmit={(e) => makeProject(e)} className="flex flex-col">
        <input type="text" name="title" className="w-40"></input>
        <input type="text" name="description" className="w-80"></input>
        <button type="submit">Submit</button>
      </form>
      
    </React.Fragment>
  );
}

export default UserController;

UserController.propTypes = {

}

