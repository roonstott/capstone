import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { auth, db } from './../firebase';
import Header from './Header';
// import * as dbFunc from './DatabaseFunctions';
import UserCreateProj from './UserCreateProj';
import UserProjGallery from './UserProjGallery'; 
import YourProjects from './YourProjects';
import ProjDetail from './ProjDetail';
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";

function UserController ({ isLoading, setIsLoading}) {
  
  const [view, setView] = useState(null);
  const [newProject, setNewProject] = useState(null);
  const [projectsOwned, setProjectsOwned] = useState([]);
  const [projectsJoined, setProjectsJoined] = useState([]);
  const [projectsInvited, setProjectsInvited] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [projDetail, setProjDetail] = useState(null);
  let display; 

  const uid = auth.currentUser.uid;  

  useEffect(() => {    
    const unSubscribe = onSnapshot(
      collection(db, "projects"),
      (collectionSnapshot) => {
        const projOwned = [];
        const projInvited = [];
        const projJoined= [];
        collectionSnapshot.forEach((doc) => {
          if(doc.data().ownerId === uid) {
            projOwned.push({...doc.data(), id:doc.id})
          } else if(doc.data().invitations.includes(uid)) {
            projInvited.push({...doc.data(), id:doc.id})
          } else if(doc.data().collaborators.includes(uid)) {
            projJoined.push({...doc.data(), id:doc.id})
          }
        });
        setProjectsOwned(projOwned);
        setProjectsJoined(projJoined);
        setProjectsInvited(projInvited)
        setAllProjects([...projOwned, ...projJoined]);
        setIsLoading(false);
      }, (error) => {
        console.log(error); 
      }      
    );
    return () => unSubscribe();
  }, [newProject]);

  const showDetail = (id) => {
    const p = allProjects.filter(p =>p.id === id);
    setProjDetail(p);
    setView("detail");
  }
  
  if(isLoading === true) {
    return (
      <p>Loading</p>
    )
  } else {
    if(view === "gallery") {
      display = <UserProjGallery allProj={allProjects} showProj={showDetail}/>
    } else if(view === "create") {
      display = <UserCreateProj setView={setView} setNewProject={setNewProject} setIsLoading={setIsLoading}/>
    } else if(view === "yourProjects") {
      display = <YourProjects projOwned={projectsOwned} showProj={showDetail}/>
    } else if(view === "detail") {
      display = <ProjDetail proj={projDetail}/>
    } else {
      display = <UserProjGallery allProj={allProjects} showProj={showDetail} />
    }

    return (
      <React.Fragment>
        <div className="">
          <Header setView={setView}/>
            {display}
        </div>
      </React.Fragment>
    );
  }  
}

export default UserController;

UserController.propTypes = {

}

