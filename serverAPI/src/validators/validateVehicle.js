import { validateAsync } from '../utils/functions';

const validateVehicle = validateAsync({

    _id: { presence: false },
    customer_id: {
      presence:true,
     },
    brand: {
     presence:true,
   },
   model: {
    presence:false,
  },
    year: {
      presence:true,
      length:{
        minimum: 1,
        message: 'debe de escribir el año'
      }
    },
    typeFuel: {
      presence:false,
     },
    numberPlace: {
      presence:true,
     },
    km: {
      presence:false,
    },
    nextKm: {
       presence:false,
     },
     createdAt: {
       presence: false,
     },
});

export default validateVehicle;
