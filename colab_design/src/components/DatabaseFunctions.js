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
  invitations.foreach(async(uid) => {
    const userDocRef = doc(db, "users", uid);
    const user = userDocRef.data();
    const updatedProjInvite = user.projectsInvited.push(projId);
    const updatedUser = {...user, projectsInvited: updatedProjInvite};
    await updateDoc(userDocRef, updatedUser);
  })
  //Add project to owner's 'projectsOwned' array
  const ownerDocRef = doc(db, "users", ownerId);
  const ownerDocData = ownerDocRef.data();
  const updatedOwnerProjArray = ownerDocData.projectsOwned.push(projId); 
  const updatedOwner = {...ownerDocData, projectsOwned: updatedOwnerProjArray };
  await updateDoc(ownerDocRef, updatedOwner); 
}

export const addCollaborator = async (projId, colabUid) => { //called each time an invitee accepts an invitation: 
  
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
 

