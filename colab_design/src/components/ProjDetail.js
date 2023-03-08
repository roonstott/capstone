import React, { useState, useEffect } from 'react'
import { collection, doc, getDoc, onSnapshot, getDocs } from "firebase/firestore";
import { db } from './../firebase';
import * as dbFunc from './DatabaseFunctions';
import ParticipantSideBar from './ParticipantSideBar';

function ProjDetail({ proj }) {
  const project = proj[0];
  const title = project.title;

  const [matches, setMatches] = useState([]);
  const [invites, setInvites] = useState(null);
  const [colabs, setColabs] = useState(null);

  let sideBar; 

  if (invites && colabs) {
    sideBar = <ParticipantSideBar invites={invites} colabs={colabs} />
  }

  const getColabs = () => {
    const localColabArray = [];
    project.collaborators.forEach(async colabUid => {
      const userRef = doc(db, "users", colabUid);
      const user = await getDoc(userRef);
      localColabArray.push(user.data())
    });
    setColabs(localColabArray);
  }

  const getInvited = () => {
    const localInviteArray = [];
    project.invitations.forEach(async colabUid => {
      const userRef = doc(db, "users", colabUid);
      const user = await getDoc(userRef);
      localInviteArray.push(user.data());    
    });
    setInvites(localInviteArray);
  }

  useEffect(() => {
    getColabs();
    getInvited();
  }, []);

  const openPopUp = () => {
    document.getElementById("participantPopUp").showModal();
  }

  const closePopUp = () => {
    document.getElementById("participantPopUp").close()
  }

  const handleQueryMatches = async (event) => {
    const input = event.target.value.toLowerCase();
    const userRef = collection(db, "users");
    const userData = await getDocs(userRef);
    let matches = [];
    if(input !== "") {    
      userData.forEach(doc => {
        if (
          (doc.data().firstName.toLowerCase().includes(input) || (doc.data().lastName.toLowerCase().includes(input)) || (doc.data().email.toLowerCase().includes(input))) && (! matches.includes(doc.data()))
        ) {
          matches.push(doc.data())
        }      
      })
    }
    setMatches(matches); 
  }

  const handleAddingParticipant = (event) => {   
    event.preventDefault(); 
    const uid = event.target.id; 
    dbFunc.inviteCollaborator(project.id, uid); 
    closePopUp();
  }

    const matchDivs = () => {
     return matches.map(el=> {
        if (matches.length === 0) {
          return <div></div>
        } else {
          return (
            <form id={el.id} onSubmit={(e) => handleAddingParticipant(e)} className="text-sm hover:text-lg flex p-2 cursor-pointer">
              <div className="bg-emerald-400 w-3 h-3 rounded mx-1 align-center"></div>
              <button className="text-center">{el.firstName} {el.lastName} {el.email}</button>              
            </form>
          )
        }
      })
    } 

  return (
    <React.Fragment>
      <div className="flex justify-around p-8 my-12">
        <div className="basis-3/4 min-h-full mx-8 min-w-fit max-w-screen-md">
          <div className="bg-slate-100 h-16 drop-shadow-md flex justify-around">
            <h3 className="basis-1/2 text-align-center p-4 text-2xl">{title}</h3>
            <div className="basis-1/2 flex justify-end">
              <button onClick={openPopUp} className=" bg-slate-200 m-2 h-12 w-auto text-align-center p-2 hover:text-lg hover:drop-shadow-xl">participants</button>
              <button className=" bg-emerald-400 m-2 h-12 w-20 text-align-center p-2 hover:text-lg hover:drop-shadow-xl">Save</button>
            </div>
          </div>
            <p className="min-h-screen bg-white p-12 " contentEditable="true">Start your project</p>
        </div>
        <div className='basis-1/4'>          
          {sideBar}
        </div>
      </div>

      {/* Dialog Bar: Separate From Default Page Render */}
      <dialog id="participantPopUp" className=" mx-20 w-2/3 h-1/2 border-slate-400 border-2">
        <div className='flex'>
          <div className="basis-5/6">
            <label Htmlfor="searchParticipants">Add Members</label>
            <input onChange={(e) => handleQueryMatches(e)} id="searchParticipants" name="searchParticipants" className="m-4 p-2 border-2"/>
            <div id="matches">              
              {matchDivs()}
            </div>
          </div>          
          <div className='basis-1/6 flex items-end'>
            <button onClick={closePopUp}className="align-self-end w-20 h-8 bg-red-300 border-slate-400 rounded px-4 py-1 text-align-center">Close</button>
          </div>          
        </div>       
      </dialog>
      
    </React.Fragment>
  )
}

export default ProjDetail; 