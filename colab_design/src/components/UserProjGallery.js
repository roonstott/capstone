import React from 'react';
// import PropTypes from 'prop-types';
import { auth } from "./../firebase.js";
import * as dbFunc from './DatabaseFunctions';

function UserProjGallery ({ allProj, showProj }) {

  const showDetail = (event) => {
    event.preventDefault(); 
    const projId = event.target.id;
    showProj(projId);
  }

  let display = allProj.map(el => {
    const title = el.title;
    const description = el.description;
    const projId = el.id;

    return (
      
      <tr className="bg-zinc-100 hover:bg-blue-50">
        <td className=" w-32 h-32 opacity-50 p-8 hover:opacity-100">          
          <div id={projId} onClick={(e) => showDetail(e)} className="bg-emerald-300 w-full h-full m-8 my-8 outline outline-2 rounded hover:shadow-2xl outline-2 outline-slate-300 cursor-pointer hover:outline-emerald-500 hover:scale-105 ">
            {title}
          </div>
        </td>
        <td className=""><button id={projId} onClick={(e) => showDetail(e)}>{description}</button></td>
      </tr>
    )
  })

  return (
    <div className="flex justify-center">
      <table className="table-auto w-full mx-6 my-12 rounded shadow-2xl">
        <thead className="bg-slate-200">
          <tr className="h-12">
            <th></th>
            <th className="text-center text-2xl">All Projects</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-solid">
          {display}          
        </tbody>
      </table>
    </div>
  );
}

export default UserProjGallery;

UserProjGallery.propTypes = {

}

