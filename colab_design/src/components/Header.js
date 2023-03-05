import React from 'react';
import { auth } from './../firebase';
import DropDownUser from './DropDownUser';
// import PropTypes from 'prop-types';

function Header () {
  return (
    <React.Fragment>
      <header class="head" className="flex justify-around py-6">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700">All Projects</button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700">Your Projects</button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700">New Project</button>        
        <div class="userDropDown">
          <DropDownUser />          
        </div>
      </header>
    </React.Fragment>
  );
}

export default Header;

Header.propTypes = {

}

