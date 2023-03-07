import React from 'react'

function ProjDetail({ proj }) {
  const p = proj[0];
  const title = p.title;
  return (
    <React.Fragment>
      <div className="min-h-screen mx-20 max-w-screen-sm">
        <div className="bg-slate-100">
          <h3>{title}</h3>
        </div>        
        <p className="min-h-screen bg-white p-12 " contentEditable="true">Start your project</p>
      </div>
      
    </React.Fragment>
  )
}

export default ProjDetail; 