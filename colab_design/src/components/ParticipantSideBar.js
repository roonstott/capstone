import React, { useState, useEffect } from 'react';
// import { db } from './../firebase';
// import { collection, doc, getDoc, onSnapshot, getDocs } from "firebase/firestore";

function ParticipantSideBar({ invites, colabs }) {

  console.log("colabs ", colabs); 

  console.log("invites ", invites);  

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