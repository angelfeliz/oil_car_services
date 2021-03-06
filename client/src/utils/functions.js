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

export const calculateTotal = (list = [], total_itebis_tmp = 0, total_bruto_tmp = 0, cantidad = 0, desc = 0) => {
  let total_bruto = total_bruto_tmp * cantidad;
  let total_itebis = total_itebis_tmp * cantidad;
  let total_neto = total_bruto + total_itebis;

  for (let i = 0; i < list.length; i++) {
    let item = list[i];
    total_bruto = (total_bruto + (parseFloat(item.price) * parseInt(item.quantity)));
    total_itebis = total_itebis + (parseFloat(item.itebis) * parseInt(item.quantity));
    total_neto = total_bruto + total_itebis;
  }

  total_bruto = parseFloat(parseFloat(Math.round(total_bruto * 100) / 100).toFixed(2));
  total_itebis = parseFloat(Math.round(total_itebis * 100) / 100).toFixed(2);
  if(total_neto < desc) {
    total_neto = total_neto.toFixed(2);
  }
  else {
    total_neto = parseFloat(parseFloat(total_neto) - parseInt(desc)).toFixed(2);
  }

  desc = desc == 0 ? '' : desc;
  return {
    totalBruto: total_bruto,
    totalNeto: total_neto,
    totalItebis: total_itebis,
    totalDesc: desc
  }
}

export const calculateWithLabor = (laborIn=0, netoIn=0) => {
  let labor = Number.parseInt(laborIn);
  if(typeof labor == "number" && !isNaN(labor)) {
     let neto = parseFloat(netoIn);
     if(typeof neto === "number" && !isNaN(neto)) {
       let newNeto = parseFloat((labor + neto).toFixed(2));
       return newNeto;
     }
    return labor;
  }
}
