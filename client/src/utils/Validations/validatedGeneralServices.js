import { validateSync } from '../functions';

 const validatedGeneralServices = validateSync({
      totalDesc: { presence: false },
      totalBruto: { presence: true },
      totalItebis: { presence: true },
      totalNeto: { presence: true },
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

 });

export default validatedGeneralServices;
