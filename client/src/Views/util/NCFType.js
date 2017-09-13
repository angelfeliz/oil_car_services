import React from 'react';

const NCFType = (props) => {
  return (
    <div>
      <input type="radio" value="1" defaultChecked onClick={(e) => props.onClickNCFType(e)}/> <span> Empresareal</span>
      <input type="radio" value="2" onClick={(e) => props.onClickNCFType(e)}/> <span> Gubernamental</span>
    </div>
  )
}

export default NCFType;
