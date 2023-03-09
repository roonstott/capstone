import React from 'react';
import * as dbFunc from './DatabaseFunctions';
import { auth } from './../firebase';
// import PropTypes from 'prop-types';

function UserCreateProj ({setView, setNewProject, setIsLoading}) {

  const makeProject = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const description = event.target.description.value; 
    const owner = auth.currentUser.uid;
    const docRef = dbFunc.makeProject(owner, title, description);
    docRef.then(() => {
      setIsLoading(true);
      setView("gallery");
      setNewProject(docRef)
    })
  }

  return (
    <React.Fragment>
      <div className='flex justify-center'>
        <div className='grid grid-cols-1 justify-items-center w-full m-6 p-6 justify-center bg-zinc-50 shadow-xl'>
          <h1 className="text-cyan-700 text-center text-2xl py-2">Start A New Project</h1> 
          <form className='w-5/6 grid grid-cols-1 justify-items-center py-2' onSubmit={(e) => makeProject(e)} >
            <div className='my-6'>
              <label htmlFor="title">Title</label>
              <input className='m-4 px-2 py-1 outline outline-blue-200 hover:drop-shadow-md rounded-sm' type="text" name="title" ></input>
            </div>
              <label htmlFor="description">Description</label>
              <textarea className='w-full m-4 px-2 py-1 outline outline-blue-200 hover:drop-shadow-md rounded-sm' type="text" name="description"></textarea>
            <button className="bg-slate-300 border-slate-400 rounded px-4 my-3 p-1 w-fit hover:drop-shadow-xl" type="submit">Submit</button>
          </form>
        </div>        
      </div>      
      


      {/* <h1 className='text-center my-8 text-xl'>Welcome To The Colab Hub</h1>
          <div className='flex justify-center basis-3/4'>            
            <div className="grid grid-cols-1 justify-items-center w-2/3 my-6 p-6 justify-center bg-zinc-50 shadow-xl">
              <h1 className="text-cyan-700 text-center text-xl py-2">Sign In</h1>            
              <form className='grid grid-cols-1 justify-items-center py-2' onSubmit={(e) => this.doSignIn(e)}>
                <div>
                  <label className='my-1' htmlFor="email">Email Address</label>
                  <input className='m-2 px-2 py-1 outline outline-blue-200 hover:drop-shadow-md rounded-sm' type="text" name="email" placeholder='Email Address' />
                </div>
                <div>
                  <label className='m-2' htmlFor="password">Password</label>
                  <input className='m-2 px-2 py-1 outline outline-blue-200 hover:drop-shadow-md rounded-sm' type="text" name="password" placeholder='Password' />
                </div>
                <div>
                  <button className="bg-cyan-500 opacity-90 border-slate-400 rounded px-4 my-4 py-1 px-8 w-fit hover:drop-shadow-xl" type="submit">Sign In</button>
                </div>              
              </form>
              <p className='my-3'>- OR -</p>
              <button className="bg-slate-300 border-slate-400 rounded px-4 my-3 p-1 w-fit hover:drop-shadow-xl" onClick={() => this.showSignUp()}>Create a new account</button>
            </div>
          </div> */}

    </React.Fragment>
  );
}

export default UserCreateProj;

UserCreateProj.propTypes = {

}

