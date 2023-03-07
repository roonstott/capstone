import React from 'react'

function ProjDetail({ proj }) {
  const p = proj[0];
  const title = p.title;
  return (
    <React.Fragment>
      <div className="min-h-full mx-20 max-w-screen-md my-12">
        <div className="max-w-screen-md min-w-full place-self-center">
          <div className="bg-slate-100 h-16 drop-shadow-md flex justify-around">
            <h3 className="basis-1/2 text-align-center p-4 text-2xl">{title}</h3>
            <div className="basis-1/2 flex justify-end">
            <button className=" bg-slate-200 m-2 h-12 w-auto text-align-center p-2 hover:text-lg hover:drop-shadow-xl">participants</button>
              <button className=" bg-emerald-400 m-2 h-12 w-20 text-align-center p-2 hover:text-lg hover:drop-shadow-xl">Save</button>
            </div>
          </div>   

          <p className="min-h-screen bg-white p-12 " contentEditable="true">Start your project</p>

        </div>
      </div>
      
    </React.Fragment>
  )
}

export default ProjDetail; 