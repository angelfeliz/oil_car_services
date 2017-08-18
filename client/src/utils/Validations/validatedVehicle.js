import { validateSync } from '../functions';

 const validateVehicle = validateSync({
  brand: {
    presence: true,
  },
  model: {
    presence: false,
  },
  numberPlace: {
    presence: true,
  },
  year: {
    presence: false,
  },
  km: {
    presence: false,
  },
  nextKm: {
    presence: false,
  },
  createdAt: {
    presence: false,
  },
  customer_id: {
    presence: true,
  },
  typeFuel: {
    presence: false,
  }
})

export default validateVehicle;
