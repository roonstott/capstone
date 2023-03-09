import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { auth, db } from './../firebase';
import Header from './Header';
import * as dbFunc from './DatabaseFunctions';
import UserCreateProj from './UserCreateProj';
import UserProjGallery from './UserProjGallery'; 
import YourProjects from './YourProjects';
import ProjDetail from './ProjDetail';
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";

function UserController () {
  
  const [view, setView] = useState(null);
  const [newProject, setNewProject] = useState(null);
  const [projectsOwned, setProjectsOwned] = useState([]);
  const [projectsJoined, setProjectsJoined] = useState([]);
  const [projectsInvited, setProjectsInvited] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [projDetail, setProjDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const [invitationShown, setInvitationShown] = useState(false);
  const [modalOpen, setModalOpen] = useState(false)

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
            const timeOpen = doc.get('dateCreated', {serverTimestamps: "estimate"}).toDate();
            const jsDate = new Date(timeOpen); 
            projOwned.push({...doc.data(), id:doc.id, dateCreated:jsDate})
          } 
          if(doc.data().invitations.includes(uid)) {
            const timeOpen = doc.get('dateCreated', {serverTimestamps: "estimate"}).toDate();
            const jsDate = new Date(timeOpen); 
            projOwned.push({...doc.data(), id:doc.id, dateCreated:jsDate})
            projInvited.push({...doc.data(), id:doc.id})
          } 
          if(doc.data().collaborators.includes(uid)) {
            const timeOpen = doc.get('dateCreated', {serverTimestamps: "estimate"}).toDate();
            const jsDate = new Date(timeOpen); 
            projOwned.push({...doc.data(), id:doc.id, dateCreated:jsDate})
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
    
  }, [newProject, uid]);

  useEffect(() => {    
    if(invitationShown === false && projectsInvited.length > 0) {
      setTimeout(()=> {
        document.getElementById("invitationPopUp").showModal();
        setInvitationShown(true);
        setModalOpen(true);
      }, 1200)
    }
  }, [invitationShown, projectsInvited])

  const showDetail = (id) => {
    const p = allProjects.filter(p =>p.id === id);
    setProjDetail(p);
    setView("detail");
  }

  const showInvitations = () => {
    let invitationDisplay;
    if (projectsInvited.length === 0 && modalOpen === true) {
      setTimeout(() => {
        document.getElementById("invitationPopUp").close();
      }, 600);      
    } else if (projectsInvited.length > 0) {      
      invitationDisplay = projectsInvited.map(inv => {
        return (
          <div className='flex justify-around'>
            <div className='basis-1/2 p-6'>
              <p className='text-lg'>{inv.title}</p>
              <p className='text-sm'>{inv.description}</p>            
            </div>
            <div className='basis-1/2 p-6'>
              <button onClick={() => dbFunc.addCollaborator(inv.id, uid)} className="bg-emerald-300 border-slate-400 rounded px-4 py-1 mx-6">Accept</button>
              <button className="bg-red-300 border-slate-400 rounded px-4 py-1 mx-6">Dismiss</button>
            </div>
          </div>          
        )
      })
    }
    return invitationDisplay;    
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
          <Header setView={setView} projectsInvited={projectsInvited} setModalOpen={setModalOpen}/>
            {display}
        </div>

        <dialog className="w-2/3 h-1/2" id="invitationPopUp">
          <div className='p-6'>
            <h2 className='text-center text-2xl'>You have pending invitations</h2>
            {showInvitations()}          
            <button className="bg-red-300 border-slate-400 rounded px-4 py-1" onClick={() => {document.getElementById("invitationPopUp").close(); setModalOpen(false)}}>Close</button>
          </div>
        </dialog>
      </React.Fragment>
    );
  }  
}

export default UserController;

UserController.propTypes = {

}

