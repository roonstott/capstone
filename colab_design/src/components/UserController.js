import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { auth, db } from './../firebase';
import Header from './Header';
// import * as dbFunc from './DatabaseFunctions';
import UserCreateProj from './UserCreateProj';
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";


function UserController () {

  const [projectsOwned, setProjectsOwned] = useState([]);
  const [projectsInvited, setProjectsInvited] = useState([]); 

  const uid = auth.currentUser.uid;  

  useEffect(() => {    
    const unSubscribe = onSnapshot(
      doc(db, "users", uid), 
      (docSnapshot) => { 
        const projOwned = docSnapshot.data().projectsOwned.map(p => {
          return (p);
        });
        const projInvited = docSnapshot.data().projectsInvited.map(p => {
          return (p);
        });        
        setProjectsOwned(projOwned);
        setProjectsInvited(projInvited); 
      },
      (error) => {
        console.log(error); 
      }
    );
    return () => unSubscribe(); 
  }, [uid]);

  //  

  projectsOwned.forEach(async(id) => {
    const snapshot = await getDoc(doc(db, "projects", id));
    const data = snapshot.data(); 
    console.log("owned", data.description); 
  }); 

  projectsInvited.forEach(async(id) => {
    const snapshot = await getDoc(doc(db, "projects", id));
    const data = snapshot.data(); 
    console.log("invited", data.description); 
  }); 




  
  
  return (
    <React.Fragment>
      <Header />
      <p>You have reached your account {auth.currentUser.email}</p>
      <UserCreateProj />      
    </React.Fragment>
  );
}

export default UserController;

UserController.propTypes = {

}

