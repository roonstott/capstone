import React from 'react';
import DropDownUser from './DropDownUser';

// import PropTypes from 'prop-types';


function Logo () {
  return (
    <React.Fragment>
      <div  className="flex py-4 bg-gradient-to-r from-lime-200 to-[#1da1f2]">
        <h1 className="basis-5/6 text-5xl text-white text-center">Colab Hub</h1>
        <div className=" basis-1/6 flex justify-end m-4">
          <DropDownUser /> 
        </div>
                  
      </div>
    </React.Fragment>
    
  );
}

export default Logo;

Logo.propTypes = {

}

