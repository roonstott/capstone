import React, { useState, useEffect } from 'react'
import { collection, doc, getDoc, onSnapshot, getDocs, updateDoc } from "firebase/firestore";
import { db } from './../firebase';
import * as dbFunc from './DatabaseFunctions';
import ParticipantSideBar from './ParticipantSideBar';

function ProjDetail({ proj }) {
  const project = proj[0];
  const title = project.title;
  const textEditor = project.value;
  const projId = project.id
  const [matches, setMatches] = useState([]);  

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

    const handleSave = async () => {
      console.log("projId: ", projId); 
      const newValue = document.getElementById("textEditor").innerText;
      const projRef = doc(db, "projects", projId);
      const projSnap = await getDoc(projRef);
      const projData = projSnap.data(); 
      const updatedProjData = {...projData, id:projId, value:newValue};
      await updateDoc(projRef, updatedProjData);
    }

  return (
    <React.Fragment>
      <div className="flex justify-around p-8 my-12">
        <div className="basis-3/4 min-h-full mx-8 min-w-fit max-w-screen-md">
          <div className="bg-slate-100 h-16 drop-shadow-md flex justify-around">
            <h3 className="basis-1/2 text-align-center p-4 text-2xl">{title}</h3>
            <div className="basis-1/2 flex justify-end">
              <button onClick={openPopUp} className=" bg-slate-200 m-2 h-12 w-auto text-align-center p-2 hover:text-lg hover:drop-shadow-xl">participants</button>
              <button onClick={() => handleSave()}className=" bg-emerald-400 m-2 h-12 w-20 text-align-center p-2 hover:text-lg hover:drop-shadow-xl">Save</button>
            </div>
          </div>
            <p id="textEditor" className="min-h-screen bg-white p-12 " contentEditable="true">{textEditor}</p>
        </div>
        <div className='basis-1/4'>          
          <ParticipantSideBar proj={project} />
        </div>
      </div>

      {/* Dialog Bar: Separate From Default Page Render */}
      <dialog id="participantPopUp" className=" mx-20 w-2/3 h-1/2 border-slate-400 border-2">
        <div className='flex'>
          <div className="basis-5/6">
            <label htmlFor="searchParticipants">Add Members</label>
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