import React from 'react';
// import PropTypes from 'prop-types';
import { auth } from "./../firebase.js";
import * as dbFunc from './DatabaseFunctions';

function UserProjGallery () {

  const allProj = async () => {
    const p = await dbFunc.getProjects(auth.currentUser.uid);
    console.log("all projects: ", p.allProjects); 
  }

  allProj(); 

  return (
    <p>Place Holder</p>
  );
}

export default UserProjGallery;

UserProjGallery.propTypes = {

}

