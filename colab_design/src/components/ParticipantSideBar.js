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
        <tr>
          <td>
          {el.firstName} {el.lastName} {el.email}
          </td>
        </tr>
      )
    })

    const inviteDisplay = invites.map(el => {  
      return (
        <tr>
          <td>            
            {el.firstName} {el.lastName} {el.email}
          </td>
        </tr>       
      )      
    })

  return (
    <React.Fragment>
      <div className="flex flex-col min-h-screen border-1 border-slate-500 w-full bg-gray-100 rounded-sm">

        <h3>Owner: {owner.firstName} {owner.lastName} {owner.email}</h3>

        <div className='flex'>
          <table>
            <thead>
              <tr>
                <td>
                  Collaborators
                </td>
              </tr>
            </thead>
            <tbody>
              {colabDisplay}
            </tbody>
          </table>
        </div>

        <div className='flex'>
          <table>
            <thead>
              <tr>
                <td>
                  Invited
                </td>
              </tr>
            </thead>
            <tbody>
              {inviteDisplay}
            </tbody>
          </table>
        </div>        

      </div>
    </React.Fragment>
  )    
}

export default ParticipantSideBar; 