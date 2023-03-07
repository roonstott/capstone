import React from 'react'

function ProjDetail({ proj }) {
  const p = proj[0];
  const title = p.title;
  return (
    <React.Fragment>
      <p>{title}</p>
    </React.Fragment>
  )
}

export default ProjDetail; 