import api from '../api';


export const ERROR_ON_VEHICLE = "ERROR_ON_VEHICLE";

export const FILTER_VEHICLE = 'FILTER_VEHICLE';
export const TOGGLE_VEHICLE_FORM = 'SHOW_FROM_VEHICLE';
export const ADD_VEHICLE_ERRORS = 'ADD_VEHICLE_ERRORS';
export const ADD_VEHICLE_ITEM = 'ADD_VEHICLE_ITEM';
export const RESET_STAGE_VEHICLE = 'RESET_STAGE_VEHICLE';
export const STAGE_VEHICLE = 'STAGE_VEHICLE';
export const DID_SAVED_VEHICLE = 'DID_SAVED_VEHICLE';
export const RECEIVE_VEHICLES = 'RECEIVE_VEHICLES';
export const ADD_OWNER = 'ADD_OWNER';
export const CLEAN_VEHICLE_STATE = 'CLEAN_VEHICLE_STATE';

const errorVehicle = (error) => {
  return {
    type: ERROR_ON_VEHICLE,
    error,
  }
}


export const cleanVehicleStateDefault = () => ({
  type: CLEAN_VEHICLE_STATE
})
export const addOwnerItem = (owner) => ({
  type: ADD_OWNER,
  property: owner.property,
  value: owner.value,
})
export const stageVehicle = (vehicle) => ({
  type: STAGE_VEHICLE,
  customer_id: vehicle.customer_id,
  _id: vehicle._id,
  brand: vehicle.brand,
  model: vehicle.model,
  year: vehicle.year,
  numberPlace: vehicle.numberPlace,
  typeFuel: vehicle.typeFuel,
  km: vehicle.km,
  nextKm: vehicle.nextKm,
  createdAt: vehicle.createdAt,
  selectOwner: vehicle.selectOwner,
})
export const didSavedVehicle = (didSaved) => ({
  type: DID_SAVED_VEHICLE,
  didSaved: didSaved,
})
export const resetStageVehicle = ()  => ({
  type: RESET_STAGE_VEHICLE,
})
export const addVehicleItem = (vehicle) => {
  return {
    type: ADD_VEHICLE_ITEM,
    property: vehicle.property,
    value: vehicle.value
  }
}
export const toggleVehicleForm = () => ({
  type: TOGGLE_VEHICLE_FORM,
})
export const addVehicleErrors = (errors) => {
  return {
    type: ADD_VEHICLE_ERRORS,
    errors: errors.map(item => item)
  }
}
export const filterVehicle = (filter) => {
  return {
    type: FILTER_VEHICLE,
    filter,
  }
}
export const receiveVehicles = (vehicles) => ({
  type:RECEIVE_VEHICLES,
  vehiclesArray : vehicles.map(item => item),
})
export const saveVehicle = (state) => {

  return (dispatch) => {
    console.log('obj', state);
    api.post("/vehicle", state)
      .then(
         (responses) => { return responses.data },
         (error) => {
           console.log(error);
           dispatch(errorVehicle(error));
         }
      )
      .then(
      (data) =>  {
        dispatch(getVehicles());
      },
      (error) => {
        console.log(error);
        throw error;
      }
      )
      .then(
        () => dispatch(resetStageVehicle()),
        (error) => {
          console.log(error);
          throw error;
        }
      )
      .then(
        () => dispatch(toggleVehicleForm()),
        (error) => {
          console.log(error);
          throw error;
        }
      )
      .then( () => {
        dispatch(didSavedVehicle(true));
        window.setTimeout(()=>{dispatch(didSavedVehicle(false))},1000);
      },
      (error) => {
        console.log(error);
        throw error;
      }
    )
  }
}
export const getVehicleById = (state) => {
  return (dispatch) => {

      api.get('/vehicle:id', state)
        .then(
          (responses) => { return responses.data; },
          (error) => { dispatch(errorVehicle(error)); }
        )
  }
}
export const getVehicles = (state) => {
  return (dispatch) => {

      api.get('vehicle/vehicleList')
        .then(
          (responses) => { return responses.data; },
          (error) => { dispatch(errorVehicle(error)); }
        )
        .then(
          (data) => {
             dispatch(receiveVehicles(data)); },
          (error) => {throw error;}
        )
  }
}
export const updateVehicle = (state) => {
  return (dispatch) => {
console.log('state', state);
      api.put('/vehicle/update', state)
        .then(
          (responses) => { responses.data; },
          (error) => {
            dispatch(errorVehicle(error));
            throw error;
           }
        )
        .then(
          (data) => { dispatch(getVehicles()); },
          (error) => {
            console.log(error);
            throw error;
          }
        )
        .then(
          () => dispatch(resetStageVehicle()),
          (error) => {
            console.log(error);
            throw error;
          }
        )
        .then(
          () => dispatch(toggleVehicleForm()),
          (error) => {
            console.log(error);
            throw error;
          }
        )
        .then( () => {
          dispatch(didSavedVehicle(true));
          window.setTimeout(()=>{dispatch(didSavedVehicle(false))},1000);
        },
        (error) => {
          console.log(error);
          throw error;
        }
      )
  }
}
export const getVehiclesByCustomer = (customer_id) => {
  return (dispatch) => {
      api.get(`vehicle/vehicleCustomerId/${customer_id}` )
        .then(
          (responses) => { return responses.data; },
          (error) => { dispatch(errorVehicle(error)); }
        )
        .then(
          (data) => { console.log('tiene vehiculos',data);
            dispatch(receiveVehicles(data)); },
          (error) => {throw error;}
        )
  }
}
