import { validateSync } from '../utils/functions';


const validateProduct = validateSync({
 name_: {
   presence: true,
 },
 typeProduct: {
   presence: true,
 },
 model: {
   presence: false,
 },
 api: {
   presence: false,
 },
 price: {
   presence: true,
   numericality: {strict: true}  
 }
});
export default validateProduct;
