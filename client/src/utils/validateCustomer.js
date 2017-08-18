import { validateSync } from '../utils/functions';


const validateCustomer = validateSync({
 firstName: {
   presence: true,
 },
 lastName: {
   presence: true,
 },
 phoneNumber: {
   presence: false,
 },
 email: {
   presence: false,
 },
 rnc: {
   presence: false,
 },
 createdAt: {
   presence: false,
 }
});
export default validateCustomer;
