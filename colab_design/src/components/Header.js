import React from 'react';
import { auth } from './../firebase';
// import PropTypes from 'prop-types';

function Header () {
  return (
    <React.Fragment>
      <header>
        <div class="projNav">
          <button>All Projects</button>
          <button>Your Projects</button>
          <button>New Project</button>
        </div>
        <div class="userDropDown">
          <button>{auth.currentUser.email} V </button>
        </div>
      </header>
    </React.Fragment>
  );
}

export default Header;

Header.propTypes = {

}

