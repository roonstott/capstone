import React from 'react';
// import PropTypes from 'prop-types';
import { auth } from "./../firebase.js";
import * as dbFunc from './DatabaseFunctions';

function UserProjGallery ({ projOwned, projJoined}) {


  let display = projOwned.map(el => {
    const title = el.title; 
    const description = el.description;
    return (
      <tr>
        <td className="bg-slate-200 w-32 h-32">
          <div className="bg-emerald-100 w-5/6 h-5/6 m-2 outline outline-2">
            {title}
          </div>          
        </td>
        <td className="bg-slate-100">{description}</td>
      </tr>     
    )
  })



  return (
    <div className="flex justify-center">
      <table className="table-auto outline outline-2 w-5/6 my-12 ">
        <thead className="bg-slate-200">
          <tr className="w-full">
            <th>All Projects</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {display}          
        </tbody>
      </table>
    </div>
  );
}

export default UserProjGallery;

UserProjGallery.propTypes = {

}

