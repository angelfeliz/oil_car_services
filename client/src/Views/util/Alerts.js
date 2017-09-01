import React from 'react';

export const AlertSuccess = (props) => {
  return ( <div className="alert alert-success" role="alert">{props.text}</div> )
}

export const RenderErrorMessage = (errors) => {
  console.log('quien llega',errors.errors);
  console.log('quien llega',errors[0][0]);
  console.log('quien llega',errors["0"]);
  //debugger;
    if (errors != undefined) {
      if (errors["0"] != undefined) {
        let errorTemplate = [];
        let keys = Object.keys(errors["0"]);
        console.log('llaves', keys);
        for (let x = 0; x < keys.length; x++) {
          errorTemplate.push(
            <div key={x} className="alert alert-danger" role="alert">{errors["0"][keys[x]]}</div>
          )
        }
        console.log('quien se va', errorTemplate);
        return errorTemplate;
      }
    }
  }
