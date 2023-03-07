import React from 'react';
// import { auth } from './../firebase';
import DropDownUser from './DropDownUser';
// import PropTypes from 'prop-types';

function Header ({ setView }) {
  return (
    <React.Fragment>
      <header className="flex justify-around py-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-[#8DD3D1] rounded-[40%/10%] ring-4 ring-blue-500 mx-8 my-4 drop-shadow-2xl  shadow-inner-2xl mix-blend-darken opacity-90">
        <button onClick={() => setView("gallery")} className="bg-[#1da1f2] hover:bg-emerald-500 text-white font-bold py-2 px-4 border border-red-700 rounded-[40%/10%]">All Projects</button>
        <button onClick={() => setView("yourProjects")} className="bg-[#1da1f2] hover:bg-emerald-500 text-white font-bold py-2 px-4 border border-red-700 rounded-[40%/10%]">Your Projects</button>
        <button onClick={() => setView("create")} className="bg-[#1da1f2] hover:bg-emerald-500 text-white font-bold py-2 px-4 border border-red-700 rounded-[40%/10%]">New Project</button>        
        <div>
          <DropDownUser />          
        </div>
      </header>
    </React.Fragment>
  );
}

export default Header;

Header.propTypes = {

}

