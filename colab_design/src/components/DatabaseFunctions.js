import { auth, db } from './../firebase';
import { collection, addDoc, doc, setDoc } from "firebase/firestore";

const makeUser = async (uid, e, first, last) => { //called once on account creation
  const profile = {
    firstName: first,
    lastName: last,
    email: e, 
    collaborators: [], //array of id's
    projectsOwned: [], //array of id's
    projectsInvited: [], //array of id's
    projectsJoined: [] //array of id's
  }
  await setDoc(doc(db, "users", uid)), profile;  
}

const makeProject = async () => {
  const project = {

  }
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