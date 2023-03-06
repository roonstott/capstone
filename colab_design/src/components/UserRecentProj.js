import React from 'react'
import { auth } from "./../firebase.js";
import * as dbFunc from './DatabaseFunctions';


 function UserRecentProj() {

  const allProj = async () => {
    const p = await dbFunc.getProjects(auth.currentUser.uid);
    return p;
  }

  const p = allProj();
  p.then(result => {
    console.log("result", result.projectsOwned[0]); 
  })

  


  return (
    <React.Fragment>

    </React.Fragment>
  )
}

export default UserRecentProj; 