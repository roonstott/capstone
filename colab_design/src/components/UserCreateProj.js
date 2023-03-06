import React from 'react';
import * as dbFunc from './DatabaseFunctions';
import { auth } from './../firebase';
// import PropTypes from 'prop-types';

function UserCreateProj () {

  const makeProject = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const description = event.target.description.value; 
    const owner = auth.currentUser.uid;
    const invitations = ["WojeQI4LXdYh17PHDHl7IcyPRLp1"];
    dbFunc.makeProject(owner, title, description, invitations);
  }  

  return (
    <React.Fragment>
      <h2>Add a project</h2>      
      <form onSubmit={(e) => makeProject(e)} className="flex flex-col">
        <input type="text" name="title" className="w-40"></input>
        <input type="text" name="description" className="w-80"></input>
        <button type="submit">Submit</button>
      </form>

    </React.Fragment>
  );
}

export default UserCreateProj;

UserCreateProj.propTypes = {

}

