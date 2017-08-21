import api from '../api';
import {saveCustomer, receiveCustomer} from './customerAction';
import {saveVehicle, receiveVehicle} from './vehicleAction';

export const ADD_CUSTOMER_SERVER_CUSTOMER = 'ADD_CUSTOMER_SERVER_CUSTOMER';
export const ADD_CUSTOMER_SERVER_VEHICLE = 'ADD_CUSTOMER_SERVER_VEHICLE';
export const ADD_GENERAL_PROPERTY = 'ADD_GENERAL_PROPERTY';
export const ADD_CUSTOMER_SERVER_SERVICES = 'ADD_CUSTOMER_SERVER_SERVICES';
export const ADD_CUSTOMER_SERVER_PRODUCTS = 'ADD_CUSTOMER_SERVER_PRODUCTS';
export const GET_CUSTOMER = 'GET_CUSTOMER';
export const CHECK_OWNER_EXIST_VEHICLE = 'CHECK_OWNER_EXIST_VEHICLE';
export const STAGE_CUSTOMER_CHANGE_OIL = 'STAGE_CUSTOMER_CHANGE_OIL';
export const STAGE_VEHICLE_CHANGE_OIL = 'STAGE_VEHICLE_CHANGE_OIL';
export const GENERAL_TOTAL_PROPERTY = 'GENERAL_TOTAL_PROPERTY';
export const GET_CUSTOMER_SERVER_CUSTOMER = 'GET_CUSTOMER_SERVER_CUSTOMER';
export const RECEIVE_VEHICLE_ARRAY = 'RECEIVE_VEHICLE_ARRAY';
export const TOGGLE_MODAL_LIST_VEHICLE = 'TOGGLE_MODAL_LIST_VEHICLE';
export const TOGGLE_IS_SAVED = 'TOGGLE_IS_SAVED';
export const TOGGLE_REDIRECT = 'TOGGLE_REDIRECT';
export const ADD_OIL_CHANGE_ERRORS = 'ADD_OIL_CHANGE_ERRORS';

export const addCustomerServerProduct = (product) => {
    return {
        type: ADD_CUSTOMER_SERVER_PRODUCTS,
        product_id: product.product_id,
        typeProduct: product.typeProduct,
        name_: product.name_,
        price: product.price,
        quantity: product.quantity,
        itebis: product.itebis,
        totalProduct: product.totalProduct
    }
}
export const addCustomerServerServices = (servies) => {
    return {type: ADD_CUSTOMER_SERVER_SERVICES, property: servies.property, value: servies.value}
}
export const addGeneralProperty = (general) => {
    return {type: ADD_GENERAL_PROPERTY, property: general.property, value: general.value}
}
export const addCustomerServerCustomer = (customer) => {
    return {type: ADD_CUSTOMER_SERVER_CUSTOMER, property: customer.property, value: customer.value}
}
export const addCustomerServerVehicle = (vehicle) => {
    return {type: ADD_CUSTOMER_SERVER_VEHICLE, property: vehicle.property, value: vehicle.value}
}
export const getCustomerServerCustomer = (state = {}, data) => {
    return {type: GET_CUSTOMER_SERVER_CUSTOMER, state, data}
}
export const checkOwnerExistVehicle = (customerId) => {
    return {type: CHECK_OWNER_EXIST_VEHICLE, customerId}
}
export const generalTotalProperty = (totalBruto, totalNeto, totalItebis, totalDesc) => {
    return {type: GENERAL_TOTAL_PROPERTY, totalBruto, totalNeto, totalItebis, totalDesc}
}
export const stageCustomer = (customer) => {
    return {
        type: STAGE_CUSTOMER_CHANGE_OIL,
        customer_id: customer[0].customer_id,
        firstName: customer[0].firstName,
        lastName: customer[0].lastName,
        email: customer[0].email,
        phoneNumber: customer[0].phoneNumber,
        rnc: customer[0].rnc,
        createdAt: customer[0].createdAt
    }
}
export const stageVehicle = (vehicle) => {
    console.log(vehicle);
    return {
        type: STAGE_VEHICLE_CHANGE_OIL,
        vehicle_id: vehicle._id,
        brand: vehicle.brand,
        model: vehicle.model,
        numberPlace: vehicle.numberPlace,
        year: vehicle.year,
        km: vehicle.km,
        nextKm: vehicle.nextKm,
        typeFuel: vehicle.typeFuel,
        createdAt: vehicle.createdAt
    }
}
export const receiveVehicleArray = (vehicles) => {
    return {
        type: RECEIVE_VEHICLE_ARRAY,
        vehicles: vehicles.map(item => item)
    }
}
export const toggleModalListVehicle = () => {
    return {type: TOGGLE_MODAL_LIST_VEHICLE}
}
export const toggledidSaved = () => ({type: TOGGLE_IS_SAVED})
export const toggleDoneAdnRiderect = () => ({type: TOGGLE_REDIRECT})
export const addOilChangeErrors = (errors) => ({
  type: ADD_OIL_CHANGE_ERRORS,
  errors: errors.map(item => item)  ,
})
export const postCustomerServiceForm = (state) => {
    return (dispatch) => {
        if (!state.customer.customer_id) {
            customerOilChangeSave(dispatch, state);
        } else if (!state.vehicle.vehicle_id) {
            vehicleOilChangeSave(dispatch, state);
        } else {
            servicesOilChangeSave(dispatch, state);
        }
    }
}
const customerOilChangeSave = (dispatch, state) => {
    api.post("/customer", state.customer).then((responses) => {
        return responses.data
    }, (error) => {
        console.log(error);
        //TODO dispatch a error
    }).then((data) => {
        state = {
            ...state,
            vehicle: {
                ...state.vehicle,
                customer_id: data._id
            }
        };
        console.log('customer is save');
        api.post("/vehicle", state.vehicle).then((responses) => {
            return responses.data
        }, (error) => {
            console.log(error);
            //TODO dispatch a error for vehicle
        }).then((data) => {            
            state = {
                ...state,
                vehicle: {
                    ...state.vehicle,
                    vehicle_id: data._id
                },
                customer: {
                    ...state.customer,
                    customer_id: data.customer_id
                }
            };
            api.post('/customerServices', state).then((response) => {
                return response.data;
            }, (error) => {
                console.log(error);
            }).then(() => {
                dispatch(toggledidSaved());
                window.setTimeout(dispatch(toggledidSaved()), 500);
                dispatch(toggleDoneAdnRiderect());
            }, (error) => console.log(error))
        })
    })
}
const vehicleOilChangeSave = (dispatch, state) => {
    state = {
        ...state,
        vehicle: {
            ...state.vehicle,
            customer_id: state.customer.customer_id
        }
    };
    api.post("/vehicle", state.vehicle).then((responses) => {
        return responses.data
    }, (error) => {
        console.log(error);
        //TODO dispatch a error for vehicle
    }).then((data) => {
        console.log('after vehicle is save', data);
        state = {
            ...state,
            vehicle: {
                ...state.vehicle,
                vehicle_id: data._id
            }
        };
        console.log('services object ', state);
        api.post('/customerServices', state).then((response) => {
            return response.data;
        }, (error) => {
            console.log(error);
        }).then(() => {
            dispatch(toggledidSaved());
            window.setTimeout(dispatch(toggledidSaved()), 1000);
            dispatch(toggleDoneAdnRiderect());
        }, (error) => console.log(error))
    })
}
const servicesOilChangeSave = (dispatch, state) => {
    console.log('services object ', state);
    api.post('/customerServices', state).then((response) => {
        return response.data;
    }, (error) => {
        console.log(error);
    }).then(() => {
        dispatch(toggledidSaved());
        window.setTimeout(dispatch(toggledidSaved()), 1000);
        dispatch(toggleDoneAdnRiderect());
    }, (error) => console.log(error))
}
export const getCustomerById = (id) => {
    return (dispatch) => {
        return api.get(`/customer/${id}`).then((response) => {
            return response.data;
        }, (error) => {
            console.log(error)
        }).then((data) => {
            dispatch(stageCustomer(data));
            return data;
        }, (error) => console.log('error in customerServReducer')).then((data) => {
            if (data != undefined) {
                console.log('after receive CUstomer', data);
                dispatch(getVehicleByCustomerId(id));
                dispatch(toggleModalListVehicle());
            }
        }, (error) => {
            console.log(error);
            throw error;
        })

    }
}
export const getVehicleByCustomerId = (id) => {
    return (dispatch) => {
        return api.get(`/vehicle/vehicleCustomerId/${id}`).then((response) => {
            return response.data;
        }, (error) => {
            console.log(error)
        }).then((data) => dispatch(receiveVehicleArray(data)), (error) => console.log('error in customerServReducer'))
    }
}
