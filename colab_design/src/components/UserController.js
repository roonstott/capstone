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
    const invitations = ["WojeQI4LXdYh17PHDHl7IcyPRLp1"];
    dbFunc.makeProject(owner, title, description, invitations);
  }

  const acceptInvitation = () => {
    dbFunc.addCollaborator("JHemg2AfQ9Zr8LCMvGQF", "WojeQI4LXdYh17PHDHl7IcyPRLp1" )
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

      <button onClick={() => acceptInvitation()}>Accept Invitation</button>
      
    </React.Fragment>
  );
}

export default UserController;

UserController.propTypes = {

}

