import { db } from './../firebase';
import { collection, addDoc, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";

export const makeUser = async (uid, e, first, last) => { //called once on account creation
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

export const makeProject = async (ownerId, title, description, invitations) => { //called each time a user makes a project
  const project = {
    ownerId,
    title,
    description,
    invitations, //array of uid's
    collaborators: [], //empy array to be filled with uid's as invitees accept
    editHistory: [] //empy array to be updated as people add edits
  }

  const docRef = await addDoc(collection(db, "projects"), project);
  const projId = docRef.id
  
  //Add docId to invitees' 'projectsInvited' array
  project.invitations.map(async(uid) => {
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef); 
    const userDocData = userDocSnap.data();
    const updatedProjInvite = userDocData.projectsInvited.concat(projId);
    const updatedUserDocData = {...userDocData, projectsInvited: updatedProjInvite};
    await updateDoc(userDocRef, updatedUserDocData);
  });

  //Add project to owner's 'projectsOwned' array
  const ownerDocRef = doc(db, "users", ownerId);
  const ownerDocSnap = await getDoc(ownerDocRef)
  const ownerDocData = ownerDocSnap.data(); 
  const updatedOwnerProjArray = ownerDocData.projectsOwned.concat(projId); 
  const updatedOwner = {...ownerDocData, projectsOwned: updatedOwnerProjArray };
  await updateDoc(ownerDocRef, updatedOwner); 
}

export const addCollaborator = async (projId, colabUid) => { //called each time an invitee accepts an invitation: 
  
  //update project so that colabUid is removed from invitations and added to collaborators
  const projRef = doc(db, "projects", projId );
  const projSnap = await getDoc(projRef);
  const projData = projSnap.data(); 
  const updatedInviteArray = projData.invitations.filter((id) => id !== colabUid);
  const updatedColabArray = projData.collaborators.concat(colabUid);
  const updatedProj = {...projData, invitations: updatedInviteArray, collaborators: updatedColabArray };
  await updateDoc(projRef, updatedProj);

  //update user so that projId is removed from projectsInvited and added to projectsJoined
  const userRef = doc(db, "users", colabUid);
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data();
  const updatedUserInvitations = userData.projectsInvited.filter((id) => id !== projId);
  const updatedUserColabs = userData.projectsJoined.concat(projId);
  const updatedUser = { ...userData, projectsInvited: updatedUserInvitations, projectsJoined: updatedUserColabs };
  await updateDoc(userRef, updatedUser);
}

export const getProjects = async (uid) => {
  const userSnap = await getDoc(doc(db, "users", uid));
  const userData = userSnap.data(); 
  const projectsOwned = userData.projectsOwned;
  const projectsJoined = userData.projectsJoined; 
  const allProjects = [...projectsOwned, ...projectsJoined];
  return {
    projectsOwned,
    projectsJoined,
    allProjects
  }
}

//Still need a function to invite a user to a project after it is made 'Send Invitation'

//Uplaod documents to project

//Create an edit and add it to the project edit history array
 

