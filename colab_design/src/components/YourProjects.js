import React from 'react'

function YourProjects({projOwned}) {

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
    <React.Fragment>
      <h1>Your Projects</h1>
      {display}
    </React.Fragment>
  )
}
export default YourProjects; 