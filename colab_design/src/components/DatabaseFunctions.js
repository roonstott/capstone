import { db } from './../firebase';
import { collection, addDoc, doc, setDoc, updateDoc } from "firebase/firestore";

const makeUser = async (uid, e, first, last) => { //called once on account creation
  const profile = {
    firstName: first,
    lastName: last,
    email: e, 
    collaborators: [], //array of id's to be updated as user adds collaborators
    projectsOwned: [], //array of id's to be updated as user makes projects
    projectsInvited: [], //array of id's to be updated as user is invited to projects
    projectsJoined: [] //array of id's to be updated as user accepts project invitations
  }
  await setDoc(doc(db, "users", uid), profile);  
}

const makeProject = async (owner, title, description, invitations) => { //called each time a user makes a project
  const project = {
    owner,
    title,
    description,
    invitations, //array of uid's
    collaborators: [], //empy array to be filled with uid's as invitees accept
    editHistory: [] //empy array to be updated as people add edits
  }

  await addDoc(collection(db, "projects"), project) // adds project to collection of all project
  //still need to add projId to invitees' 'projectsInvited' array
  //still need to add project to owner's 'projectsOwned' array
}

const addCollaborator = async (projId, colabUid) => { //called each time an invitee accepts an invitation: 
  
  //update project so that colabUid is removed from invitations and added to collaborators
  const projRef = doc(db, "projects", projId );
  const proj = projRef.data(); 
  const updatedInviteArray = proj.invitations.filter((id) => id !== colabUid);
  const updatedColabArray = proj.collaborators.push(colabUid);
  const updatedProj = {...proj, invitations: updatedInviteArray, collaborators: updatedColabArray };
  await updateDoc(projRef, updatedProj);

  //update user so that projId is removed from projectsInvited and added to projectsJoined
  const userRef = await doc(db, "users", colabUid);
  const user = userRef.data();
  const updatedUserInvitations = user.projectsInvited.filter((id) => id !== projId);
  const updatedUserColabs = user.projectsJoined.push(projId);
  const updatedUser = { ...user, projectsInvited: updatedUserInvitations, projectsJoined: updatedUserColabs };
  await updateDoc(userRef, updatedUser);
}

