import React from 'react';
import { auth } from './../firebase';
import DropDownUser from './DropDownUser';
// import PropTypes from 'prop-types';

function Header () {
  return (
    <React.Fragment>
      <header className="flex">
        <div class="projNav">
          <button>All Projects</button>
          <button>Your Projects</button>
          <button>New Project</button>
        </div>
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

