import React from 'react';


const BoxModel = (props) => {
  return(<div className="block_view">
    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 box_central">
      <h3>{ props.name }</h3>
      <p>Quiere desabilitar este elemento?</p>
      <div className="button-container">
         <button type="button" className="btn btn-info" onClick={ () => props.onClickAccept() }>Aceptar</button>   <button type="button" className="btn btn-warning" onClick={ () => props.onClickCancel() }>Cancelar</button>
      </div>
    </div>
  </div>)
}

export default BoxModel;
