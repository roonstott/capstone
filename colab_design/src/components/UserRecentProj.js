import React from 'react'
import { auth } from "./../firebase.js";
import * as dbFunc from './DatabaseFunctions';


function UserRecentProj() {

  const allProj = dbFunc.getProjects(auth.currentUser.uid)["allProjects"];
  console.log(allProj); 

  return (
    <React.Fragment>

    </React.Fragment>
  )
}

export default UserRecentProj; 