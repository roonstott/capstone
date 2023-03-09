import React, { useState, useEffect } from 'react';
import { db } from './../firebase';
import { collection, doc, getDoc, onSnapshot, getDocs } from "firebase/firestore";

function ParticipantSideBar({ proj }) {
  const projId = proj.id  

  const [invites, setInvites] = useState([]);
  const [colabs, setColabs] = useState([]);    
  const [owner, setOwner] = useState([]);

  useEffect(() => {    
    const unSubscribe = onSnapshot(
      collection(db, "users"),
      (collectionSnapshot) => {
        const localColabArray = [];
        const localInviteArray= [];
        collectionSnapshot.forEach((doc) => {
            if(doc.data().projectsInvited.includes(projId)) {
              localInviteArray.push({...doc.data(), id:doc.id})
            } 
            if(doc.data().projectsJoined.includes(projId)) {
              localColabArray.push({...doc.data(), id:doc.id})
            }
            if(doc.data().projectsOwned.includes(projId)) {
              setOwner({
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
                email: doc.data().email
              })
            }
          })            
        setInvites(localInviteArray);
        setColabs(localColabArray);
      }, (error) => {
        console.log(error); 
      }      
    );
    return () => unSubscribe();
  }, []);

    const colabDisplay = colabs.map(el => {
      return (
        <div className='m-2'>
          <p className='mx-2'>{el.firstName} {el.lastName}</p> 
          <p className='mx-2'>{el.email}</p>
        </div>   
      )
    })

    const inviteDisplay = invites.map(el => {  
      return (
        <div className='m-2'>
          <p className='mx-2'>{el.firstName} {el.lastName}</p> 
          <p className='mx-2'>{el.email}</p>
        </div>    
      )      
    })

  return (
    <React.Fragment>
      <div className="flex flex-col min-h-screen border-1 border-slate-500 w-full bg-gray-100 rounded-sm">

        <h3 className='m-2 font-semibold text-lg'>Owner</h3>
        <div className='m-2'>
          <p className='mx-2'>{owner.firstName} {owner.lastName}</p> 
          <p className='mx-2'>{owner.email}</p>
        </div>        
        <h3 className='m-2 font-semibold text-lg'>Collaborators</h3>
        {colabDisplay}
        <h3 className='m-2 font-semibold text-lg'>Invitations</h3>
        {inviteDisplay}       

      </div>
    </React.Fragment>
  )    
}

export default ParticipantSideBar; 