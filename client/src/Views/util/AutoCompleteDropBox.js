import React, {PropType} from 'react';
import './AutoCompleteDropBox.css';

 const AutoCompleteList = (props) => {
    var item = props.list.map((item, i) =>{
                return ( <li key={i} onClick={() => props.onClick(item._id) }>{ item.name_ }</li> )
              });
    return(<ul className={'AutoCompleteList_list-style'}>
             { item }
           </ul>
        );
      }

export default AutoCompleteList;
