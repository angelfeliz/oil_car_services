import React from 'react';
import PropTypes from 'prop-types';

const SERVICESLISTCHECKBOX = [
  {
    chk_transmision: 'Chequeo transmision'
  }, {
    chk_diferencial: 'Chequeo diferencial'
  }, {
    chk_transferencia: 'Chequeo transferencia'
  }, {
    chk_liq_frenos: 'Chequeo liquido de frenos'
  }, {
    chk_liq_hidra: 'Chequeo liquido hidraulico'
  }, {
    chk_agua_bateria: 'Chequeo agua de bateria'
  }, {
    chk_agua_radiador: 'Chequeo agua radiador'
  }, {
    chk_limpiavidrios: 'Chequeo agua limpiavidrios'
  }, {
    chk_aire_goma: 'Chequeo aire gomas'
  }, {
    chk_cristal: 'Limpieza cristales'
  }, {
    chk_aspiradora: 'Aspiradora'
  }, {
    chk_filtro_aire: 'Limpieza filtro de aire'
  }
]

 const ServicesCheckbox = (props) => {
  var closeTag = 0;

  return (
    <div className="row">
      {SERVICESLISTCHECKBOX.map((item, index) => {

        let key = Object.keys(item)[0];
        let DescriptionSelect, isDescription, select_value_1, select_value_2;
        if(key === "chk_transmision") {
          isDescription = true;
          select_value_1 = "Abierta";
          select_value_2 = "Cerrada";
        }
        else if(key === "chk_liq_hidra") {
          isDescription = true;
          select_value_1 = "Power steering";
          select_value_2 = "Electrica";
        }
        else if(key === "chk_agua_bateria") {
          isDescription = true;
          select_value_1 = "Abierta";
          select_value_2 = "Sellada";
        }
        else{isDescription = false}

        if(isDescription) {
          DescriptionSelect =  () => (<select className={`${props.services[`${key}`] ? "showElement" : "hideElement"} not_show_in_print`} name={`${key}_description`} value={props.services[`${key}_description`]} onChange={(e)=>props.onChangeServicsInput(e)}>
                               <option value="">Selecione</option>
                               <option value={select_value_1}>{select_value_1}</option>
                               <option value={select_value_2}>{select_value_2}</option>
                               </select>)
        }
        let isCheck = false;
        if(props.services[key]) {
          isCheck = true;
        }
        console.log('check ', props.services[`${key}_description`]);
        return (
          <div key={index} className="form-group col-xs-8 col-sm-4 col-md-4 col-lg-4">
            <label className="checkbox-inline">
              { isCheck ?
                <i className="fa fa-check not_show_in_screen print-show-inline" aria-hidden="true"></i>
                :
                null
              }
              <input className="not_show_in_print" onChange={(e) => props.onChange(e)} name={`${key}`} type="checkbox" value="check" checked={isCheck}/>{item[key]}
            </label>
            {
              isDescription
              ?
              <div className="selector_inline-print">
              <DescriptionSelect/>
              {
                props.services[`${key}_description`] != undefined
              ?
              <span className="not_show_in_screen option_inline-print">{props.services[`${key}_description`]}</span>
              :
              null}
              </div>
              : null
            }
          </div>
        )
      })
}
      <label className="sr-only"></label>
      <textarea name="otros" onChange={(e) => props.onChange(e)} className="form-control not_show_in_print" rows="3" placeholder="Otros"></textarea>
    </div>
  )
}

ServicesCheckbox.propType = {
  services: PropTypes.object,
  onChangeServicsInput: PropTypes.func,
  services_check: PropTypes.bool
}

export default ServicesCheckbox;
