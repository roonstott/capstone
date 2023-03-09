import React from 'react';
// import PropTypes from 'prop-types';
// import { auth } from "./../firebase.js";
import * as dbFunc from './DatabaseFunctions';
import { compareDesc } from 'date-fns'


function YourProjects ({ projOwned, showProj }) {

  const showDetail = (event) => {
    event.preventDefault(); 
    const projId = event.target.id;
    if (projId) {
      showProj(projId);
    }   
  }

  let sortedProjArray = projOwned.sort((a,b) => {
    return (
      compareDesc(a.dateCreated, b.dateCreated)
      );
  });

  let display = sortedProjArray.map(el => {
    const title = el.title;
    const description = el.description;
    const projId = el.id;
    const dateCreated = el.dateCreated
    const dateDisplay = dbFunc.formatDate(dateCreated); 


    return (

      <tr className="bg-zinc-100 hover:bg-blue-50">
        <td className=" w-32 h-32 opacity-70 p-8 hover:opacity-100">          
          <div id={projId} onClick={(e) => showDetail(e)} className=" flex items-center justify-center bg-yellow-500 w-32 h-32 outline outline-2 rounded hover:shadow-2xl outline-2 outline-slate-300 cursor-pointer hover:outline-emerald-500 hover:scale-105 ">
            <p className='text-center text-2xl text-white'>Proj</p>
          </div>
        </td>
        <td className="grid grid-cols-1 justify-items-center p-6">
          <h4 className='p-2 text-lg font-bold'>{title}</h4>
          <p className='p-2'>{description}</p>
          <p className='p-2 text-sm'>Created {dateDisplay}</p>
        </td>
      </tr>

    )
  })

  return (
    <div className="flex justify-center">
      <table className="table-auto w-full mx-6 my-12 rounded shadow-2xl">
        <thead className="bg-slate-200">
          <tr className="h-12">
            <th></th>
            <th className="text-center text-2xl">Your Projects</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-solid">
          {display}          
        </tbody>
      </table>
    </div>
  );
}

export default YourProjects;

YourProjects.propTypes = {

}

