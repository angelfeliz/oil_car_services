import R from 'ramda';
import validate from 'validate.js';

export const validateAsync = R.curry(
  (constrains, data) => validate.async(data, constrains),
);

export const isNotEmpty = x => !R.isEmpty(x);
