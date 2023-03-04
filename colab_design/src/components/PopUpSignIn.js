import React from 'react'; 

function PopUpSignIn({message}) {

  if (message !== "") {  
    return (
      <React.Fragment>
        <dialog open>
          <p>{message}</p>
          <form>
            <button>Take Me To My Account</button>
          </form>
        </dialog>
      </React.Fragment>
    )
  }
}

export default PopUpSignIn;