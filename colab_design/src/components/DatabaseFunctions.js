import { db } from './../firebase';
import { collection, addDoc, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";

//called once on account creation

export const makeUser = async (uid, e, first, last) => { 
  const profile = {
    id: uid,
    firstName: first,
    lastName: last,
    email: e, 
    projectsOwned: [], //array of id's to be updated as user makes projects
    projectsInvited: [], //array of id's to be updated as user is invited to projects
    projectsJoined: [] //array of id's to be updated as user accepts project invitations
  }
  await setDoc(doc(db, "users", uid), profile);  
}

//called each time a user makes a project

export const makeProject = async (ownerId, title, description) => { 
  const project = {
    ownerId,
    title,
    description,
    invitations: [], //empty array to be filled with uid as invitations are extended
    collaborators: [], //empy array to be filled with uid's as invitees accept
    editHistory: [] //empy array to be updated as people add edits
  }

  const docRef = await addDoc(collection(db, "projects"), project);
  const projId = docRef.id

  //Add project projId to owner's 'projectsOwned' array
  const ownerDocRef = doc(db, "users", ownerId);
  const ownerDocSnap = await getDoc(ownerDocRef)
  const ownerDocData = ownerDocSnap.data(); 
  const updatedOwnerProjArray = ownerDocData.projectsOwned.concat(projId); 
  const updatedOwner = {...ownerDocData, projectsOwned: updatedOwnerProjArray };
  await updateDoc(ownerDocRef, updatedOwner);

  return docRef;
}


//called each time an invitee accepts an invitation: 

export const addCollaborator = async (projId, colabUid) => { 
  
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

//called when a collaborator is invited to a project. Both adds projId to user invitations array, and adds userId to proj invitations array

export const inviteCollaborator = async (projId, colabUid) => {  
  const userRef = doc(db, "users", colabUid);
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data();
  if(userData.projectsJoined.includes(projId) || userData.projectsOwned.includes(projId)) {
    return;
  }

  if(!userData.projectsInvited.includes(projId)) {
    const updatedUserInvitations = userData.projectsInvited.concat(projId);
    const updatedUser = {...userData, projectsInvited: updatedUserInvitations}
    await updateDoc(userRef, updatedUser);
  }
  const projRef = doc(db, "projects", projId);
  const projSnap = await getDoc(projRef); 
  const projData = projSnap.data(); 
  if(!projData.invitations.includes(colabUid)) {
    const updatedInvitations = projData.invitations.concat(colabUid); 
    const updatedProj = {...projData, invitations: updatedInvitations}
    await updateDoc(projRef, updatedProj);
  }
}


//Uplaod documents to project

//Create an edit and add it to the project edit history array
 

