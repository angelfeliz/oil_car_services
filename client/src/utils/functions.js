import R from 'ramda';
import validate from 'validate.js';

validate.validators.presence.options = {message: "No puede estar vacío"};
validate.validators.numericality.options = {message: "Debe de ser un numero"};

export const validateSync = R.curry(
  (constrains, data) => validate(data, constrains),
);

export const onlyNumber = (value) => {
  console.log(/\d/g.test(value));
  if (Number.isInteger(parseInt(value))) {
    return true;
  }
  return false;
}

export const validationSpread = (validation) => {

  let errorList = [];
  let keyArray = Object.keys(validation);
  for (let item = 0; item < keyArray.length; item++) {
    let innerKey = Object.keys(validation[keyArray[item]]);
    for (let x = 0; x < innerKey.length; x++) {
      errorList.push(validation[keyArray[item]][innerKey[x]]);
    }
  }
  return errorList;
}

export const calculateTotal = (list = [], total_itebis_tmp = 0, total_bruto_tmp = 0, cantidad = 0) => {
  let total_bruto = total_bruto_tmp * cantidad;
  let total_itebis = total_itebis_tmp * cantidad;
  let total_neto = total_bruto + total_itebis;
  
  for (let i = 0; i < list.length; i++) {
    let item = list[i];
    total_bruto = (total_bruto + (parseFloat(item.price) * parseInt(item.quantity)));
    total_itebis = total_itebis + (parseFloat(item.itebis) * parseInt(item.quantity));
    total_neto = total_bruto + total_itebis;
  }
  //State Redux
  total_bruto = parseFloat(Math.round(total_bruto * 100) / 100).toFixed(2);
  total_neto = parseFloat(Math.round(total_neto * 100) / 100).toFixed(2);
  total_itebis = parseFloat(Math.round(total_itebis * 100) / 100).toFixed(2);

  return {
    totalBruto: total_bruto,
    totalNeto: total_neto,
    totalItebis: total_itebis,
    totalDesc: 0
  }
}
