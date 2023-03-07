import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { auth, db } from './../firebase';
import Header from './Header';
// import * as dbFunc from './DatabaseFunctions';
import UserCreateProj from './UserCreateProj';
import UserProjGallery from './UserProjGallery'; 
import YourProjects from './YourProjects';
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";

function UserController ({ isLoading, setIsLoading}) {

  
  const [view, setView] = useState(null);
  const [newProject, setNewProject] = useState(null);
  const [projectsOwned, setProjectsOwned] = useState([]);
  const [projectsJoined, setProjectsJoined] = useState([]);

  const uid = auth.currentUser.uid;  

  useEffect(() => {    
    const unSubscribe = onSnapshot(
      collection(db, "projects"),
      (collectionSnapshot) => {
        const projects = [];
        collectionSnapshot.forEach((doc) => {
          projects.push({
            title: doc.data().title,
            description: doc.data().description, 
            id: doc.id
          })
        });
        setProjectsOwned(projects);
        setIsLoading(false);
      }, (error) => {
        console.log(error); 
      }      
    );
    return () => unSubscribe();
  }, [newProject])

  let display;   
  
  if(isLoading === true) {
    return (
      <p>Loading</p>
    )
  } else {
    if(view === "gallery") {
      display = <UserProjGallery projOwned={projectsOwned} projJoined={projectsJoined}/>
    } else if(view === "create") {
      display = <UserCreateProj setView={setView} setNewProject={setNewProject} setIsLoading={setIsLoading}/>
    } else if(view === "yourProjects") {
      display = <YourProjects projOwned={projectsOwned} />
    } else {
      display = <YourProjects projOwned={projectsOwned} />
    }

    return (
      <React.Fragment>
        <Header setView={setView}/>
        <p>You have reached your account {auth.currentUser.email}</p>
        {display}
      </React.Fragment>
    );
  }  
}

export default UserController;

UserController.propTypes = {

}

