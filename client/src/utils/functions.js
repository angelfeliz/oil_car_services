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
