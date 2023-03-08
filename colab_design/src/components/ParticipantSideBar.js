import React from 'react'

function ParticipantSideBar() {

  return (
    <React.Fragment>
      <div className='flex bg-red-200 w-10 h-10'>
        <table>
          <thead>
            <tr>
              <td>
                Collaborators
              </td>
            </tr>
          </thead>
          <tbody>
            {/* Values Here */}
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
            {/* Values Here */}
          </tbody>
        </table>
      </div>

    </React.Fragment>
  )
}

export default ParticipantSideBar; 