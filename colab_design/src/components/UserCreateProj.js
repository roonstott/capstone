import React from 'react';
import * as dbFunc from './DatabaseFunctions';
import { auth } from './../firebase';
// import PropTypes from 'prop-types';

function UserCreateProj ({setView, setNewProject, setIsLoading}) {

  const makeProject = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const description = event.target.description.value; 
    const owner = auth.currentUser.uid;
    const invitations = ["H8oomh2WY7ZfTI6BeUBIPi7wpF03"];
    const docRef = dbFunc.makeProject(owner, title, description, invitations);
    docRef.then(() => {
      setIsLoading(true);
      setView("gallery");
      setNewProject(docRef)
    })
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

