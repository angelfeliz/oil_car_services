import React from 'react';

const NCFType = (props) => {
  return (
    <div>
      <input name="ncfType" type="radio" value="1" onClick={(e) => props.onClickNcfType(e)}/> <span> Empresareal    </span>
      <input name="ncfType" type="radio" value="2" onClick={(e) => props.onClickNcfType(e)}/> <span> Gubernamental</span>
    </div>
  )
}

export default NCFType;
