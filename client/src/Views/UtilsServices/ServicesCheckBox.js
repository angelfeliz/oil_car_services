import React from 'react';

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
        return (
          <div key={index} className="form-group col-sm-4 col-md-4">
            <label className="checkbox-inline">
              <input onChange={(e) => props.onChange(e)} name={`${key}`} type="checkbox" value="check"/>{item[key]}
            </label>
          </div>
        )
      })
}
      <label className="sr-only"></label>
      <textarea name="otros" onChange={(e) => props.onChange(e)} className="form-control" rows="3" placeholder="Otros"></textarea>
    </div>
  )
}

export default ServicesCheckbox;
