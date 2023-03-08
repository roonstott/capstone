import React, { useState, useEffect } from 'react';
// import { db } from './../firebase';
import { collection, doc, getDoc, onSnapshot, getDocs } from "firebase/firestore";
import SideBarSubList from './SideBarSubList';

function ParticipantSideBar({ invites, colabs }) {

  const [invites, setInvites] = useState(null);
  const [colabs, setColabs] = useState(null);  

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

    const colabDisplay = invites.map(el => {
      console.log("first name ", el.firstName)

      return (
        <tr>
          <td>
            Test
          </td>
        </tr>
      )
    })

    const inviteDisplay = colabs.map(el => {
      console.log("first name ", el.firstName)
      return (
        <tr>
          <td>            
            Test
          </td>
        </tr>       
      )      
    })

    if (colabDisplay && inviteDisplay) {
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
}

export default ParticipantSideBar; 