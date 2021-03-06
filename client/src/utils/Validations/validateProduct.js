import { validateSync } from '../functions';


const validateProduct = validateSync({
 name_: {
   presence: true,
 },
 productType: {
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
