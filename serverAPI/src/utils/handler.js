import R from 'ramda';
import { then } from './promise';

export const validateError = (res, error) =>{
  res.status(500).json({error});
}
