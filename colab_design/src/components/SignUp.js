import React from 'react';
// import PropTypes from 'prop-types';
// import { auth } from "../firebase.js";


function SignUp (props) {

  function doSignUp(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;   
    const first = event.target.first.value;
    const last = event.target.last.value;
    props.onSignUp(email, password, confirmPassword, first, last)    
  }       

  const reset = () => {
    props.tryAgain();
    document.getElementById("popUp").close();
  }

  const popUp = () => {
    if(props.message !== "") {
      document.getElementById("popUp").showModal();
    }
  }

  const goToLogIn = () => {
    props.goToLogIn();
  }

  const button = () => {
    if(props.success) {
      return (
        <button className="bg-red-300 border-slate-400 rounded px-4 py-1" type="click" onClick={() => goToLogIn()}>Go To Log In</button>
      )
    } else {
      return (
        <button className="bg-red-300 border-slate-400 rounded px-4 py-1" type="click" onClick={() => reset()}>Try Again</button>
      )
    }
  }  

  return (
    <React.Fragment>
      <div className='flex justify-center basis-3/4'>
        <div className='grid grid-cols-1 justify-items-center basis-2/3 my-6 p-6 bg-zinc-50 shadow-xl'>
          <h1 className='text-cyan-700 text-lg'>Create An Account</h1>
          <form className='py-2' onSubmit={(e) => doSignUp(e)}>
            <div>
              <label className='m-2' htmlFor="email">Email Address</label>
              <input className='m-2 px-2 py-1 outline outline-blue-200 hover:drop-shadow-md rounded-sm' type="text" name="email" placeholder='Email'></input>  
            </div>
            <div>
              <label className='m-2' htmlFor="password">Password</label>
              <input className='m-2 px-2 py-1 outline outline-blue-200 hover:drop-shadow-md rounded-sm' type="text" name="password" placeholder='Password'></input>
            </div>            
            <div>
              <label className='m-2' htmlFor="confirmPassword">Confirm Password</label>
              <input className='m-2 px-2 py-1 outline outline-blue-200 hover:drop-shadow-md rounded-sm' type="text" name="confirmPassword" placeholder='Confirm Password'></input>
            </div>
            <div>
              <label className='m-2' htmlFor="first">First Name</label>
              <input className='m-2 px-2 py-1 outline outline-blue-200 hover:drop-shadow-md rounded-sm' type="text" name="first" placeholder='First Name'></input>
            </div>
            <div>
              <label className='m-2' htmlFor="last">Last Name</label>
              <input className='m-2 px-2 py-1 outline outline-blue-200 hover:drop-shadow-md rounded-sm' type="text" name="last" placeholder='Last Name'></input>
            </div>
            <div className='flex justify-center'>
              <button className="bg-cyan-500 opacity-90 border-slate-400 rounded px-4 my-4 py-1 px-8 w-fit hover:drop-shadow-xl" type="submit">Register</button>
            </div>
            
          </form>          
        </div>        
      </div>
      <div className='flex justify-center'>
        <button className="bg-slate-300 border-slate-400 rounded px-4 my-3 p-1 w-fit hover:drop-shadow-xl" type="click" onClick={() => props.goToLogIn()}>Back To Log In Page</button>
      </div>      
      <dialog id="popUp">
        <p>{props.message}</p>
        {button()}
      </dialog>
      {popUp()}
      
    </React.Fragment>
  )
}

export default SignUp;

// SignUp.propTypes = {

// }

