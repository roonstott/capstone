import React, { useState, useEffect } from 'react';
import { db } from './../firebase';
import { collection, doc, getDoc, onSnapshot, getDocs } from "firebase/firestore";

function ParticipantSideBar({ proj }) {

  const [invites, setInvites] = useState([])
  const [colabs, setColabs] = useState([]);
  const [isLoadingInvites, setIsLoadingInvites] = useState(true); 
  const [isLoadingColabs, setIsLoadingColabs] = useState(true); 

  const project = proj[0]

  const getColabs = () => {
    const localColabArray = [];
    project.collaborators.forEach(async colabUid => {
      const userRef = doc(db, "users", colabUid);
      const user = await getDoc(userRef);
      localColabArray.push(user.data())
    });
    setColabs(localColabArray);
    setIsLoadingColabs(false); 
  }

  const getInvited = () => {
    const localInviteArray = [];
    project.invitations.forEach(async colabUid => {
      const userRef = doc(db, "users", colabUid);
      const user = await getDoc(userRef);
      localInviteArray.push(user.data());    
    });
    setInvites(localInviteArray);
    setIsLoadingInvites(false); 
  }

  useEffect(() => {
    getColabs();
    getInvited();
  }, []);


  if (!isLoadingInvites && !isLoadingColabs) {

    const display = (array, message) => {
      console.log("array inside display function ", array)
      console.log("colabs inside display array ", colabs);
      console.log("invites inside display array ", invites); 
      if(array.length === 0) {
        return (
          <tr>
            <td>{message}</td>
          </tr>
        )
      } else {
        return (
          array.map(el => {
            return (
            <tr>
              <td>{el.firstName} {el.lastName} {el.email} </td>
            </tr>
            )
          })
        )
      }
    }


    return (
      <React.Fragment>
        <div className="flex flex-col min-h-screen border-1 border-slate-500 w-full bg-gray-100 rounded-sm">

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
                {display(colabs, "No collaborators have joined")}
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
                {display(invites, "No pending invitations")}
              </tbody>
            </table>
          </div>

        </div>
      </React.Fragment>
    )
  }
}

export default ParticipantSideBar; 