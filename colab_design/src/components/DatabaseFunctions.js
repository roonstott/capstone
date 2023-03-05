import { auth, db } from './../firebase';
import { collection, addDoc, doc, setDoc } from "firebase/firestore";

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
  //still need to send invitations to invitees

}

const addCollaborator = async (projId, colabUid) => { //called each time an invitee accepts an invitation: updates project to have user, and updateds user to have project
  const proj = await doc(db, "projects", projId );
  const user = await doc(db, "users", colabUid);
  const colabArray = proj.collaborators;
  const updated
}




Projects {
  owner: userId,
  contributors: 
  [
    userId,
    userId,
    userId
  ]
  editHistory: [
    {
      editId: id,
      parentId: parentId
      timeStamp: dateTime,
      editedBy: userId,
      editedByName: userName,
      projectFile: file
    },
    {
      timeStamp: dateTime,
      projectFile: file
    },
    {
      timeStamp: dateTime,
      projectFile: file
    }
  ]
}

AllProjects: [
  projectObj,
  projectObj,
  projectObj,
  projectObj
]