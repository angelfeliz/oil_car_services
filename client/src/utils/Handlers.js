import React from 'react';

const handleChange(e) {
  //TODO make a gerenal property handle
}

const  withHandlers = (WrappedComponent) => {
  return (props) => {
    <WrappedComponent
      handleChange={handleChange}
      {...props}
    >
    </WrappedComponent>
  }
}


export default withHandlers;
