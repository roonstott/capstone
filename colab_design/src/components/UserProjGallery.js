import React from 'react';
// import PropTypes from 'prop-types';
import { auth } from "./../firebase.js";
import * as dbFunc from './DatabaseFunctions';

function UserProjGallery ({ projOwned, projJoined}) {

  // let display = projOwned.map(el => {
  //     return ( 
  //       <p>{el.title}</p>
  //     )
  //   });

  let display = projOwned.map(el => {
    const title = el.title; 
    const description = el.description;
    return (
      <div>
        <p>{title}</p>
        <p>{description}</p>
      </div>
    )
  })



  return (
    <div>
      <p>These are projects</p>
      {display}
    </div>
  );
}

export default UserProjGallery;

UserProjGallery.propTypes = {

}

