import { validateSync } from '../functions';

 const validatedOilChange = validateSync({
      totalDesc: { presence: false },
      totalBruto: { presence: true },
      totalItebis: { presence: true },
      totalNeto: { presence: true },
      supervisor: { presence: false },
      mechanic: { presence: false },
      typePayment: { presence: false },
      "customer.customer_id": { presence: false },
      "customer.email": { presence: false },
      "customer.firstName": { presence: true },
      "customer.lastName": { presence: true },
      "customer.phoneNumber": { presence: true },
      "customer.rnc": { presence: false },

    /*  "products.quantity": { presence: true },
      "products.itebis": { presence: true },
      "products.name_": { presence: true },
      "products.price": { presence: true },
      "products.product_id": { presence: true },
      "products.totalProduct": { presence: true },
      "products.typeProduct": { presence: true },*/

      "services.chk_transmision": { presence: false },
      "services.chk_diferencial": { presence: false },
      "services.chk_transferencia": { presence: false },
      "services.chk_liq_frenos": { presence: false },
      "services.chk_liq_hidra": { presence: false },
      "services.chk_agua_bateria":  { presence: false },
      "services.chk_agua_radiador":  { presence: false },
      "services.chk_limpiavidrios":  { presence: false },
      "services.chk_aire_goma":  { presence: false },
      "services.chk_cristal":  { presence: false },
      "services.chk_aspiradora":  { presence: false },
      "services.chk_filtro_aire": { presence: false },
      "services.chk_transmision_description": { presence: false },
      "services.chk_liq_hidra_description": { presence: false },
      "services.chk_agua_bateria_description": { presence: false },

      "vehicle.vehicle_id": { presence: false },
      "vehicle.brand": { presence: true },
      "vehicle.numberPlace": { presence: true },
      "vehicle.year": { presence: false },
      "vehicle.km": { presence: false },
      "vehicle.nextKm": { presence: false },
 });

export default validatedOilChange;
