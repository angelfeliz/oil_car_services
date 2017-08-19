import React, {PropType} from 'react';
import './AutoCompleteDropBox.css';

 const AutoCompleteList = (props) => {
    var item = props.list.map((item, i) =>{
                return ( <li key={i} onClick={() => props.onClick(item._id) }><div><h4>{ item.name_ }</h4>{item.model ? <p className="sub_name">{item.model}</p> : null}</div></li> )
              });
    return(<ul className={'AutoCompleteList_list-style'}>
             { item }
           </ul>
        );
      }

export default AutoCompleteList;
