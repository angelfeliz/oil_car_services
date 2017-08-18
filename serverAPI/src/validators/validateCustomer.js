import { validateAsync } from '../utils/functions';

const validateCustomer = validateAsync({
    _id: { presence:false },
   firstName: {
     presence:true,
     length: {
       minimum: 1,
       message: 'debe de escribir el primer nombre'
     }
    },
   lastName: {
     presence:true,
     length: {
       minimum: 1,
       message: 'debe de escribir el apellido'
     }
    },
   phoneNumber: {
     presence: true,
     length: {
       minimum: 1,
       message: 'debe de escribir un numero para ser contactado'
     }
    },
   email: { presence: false },
   rnc: { presence: false }
 });

export default validateCustomer;
