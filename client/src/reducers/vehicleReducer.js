import * as vehicleActionType from '../actions/vehicleAction';

let stateDefault = {
  isFilterByNumberPlace: false,
  vehicle: {
    customer_id: '',
    brand: '',
    model: '',
    year: '',
    typeFuel: '',
    numberPlace: '',
    km: '',
    nextKm: ''
  },
  vehicleArray: [],
  vehicleArrayClone: [],
  isShowVehicleForm: false,
  didSaved: false,
  vehicleErrors: [],
  isNoMatch: false,
  selectOwner:'',
}

export const vehicles = (state = stateDefault, action) => {
  switch (action.type) {
    case vehicleActionType.CLEAN_VEHICLE_STATE:
    
      return {
        ...stateDefault
      }
    case vehicleActionType.ADD_OWNER:
      return {
        ...state,
        [action.property]: action.value
      }
    case vehicleActionType.STAGE_VEHICLE:
      return {
        ...state,
        vehicle: {
          customer_id: action.customer_id,
          _id: action._id,
          brand: action.brand,
          model: action.model,
          year: action.year,
          numberPlace: action.numberPlace,
          typeFuel: action.typeFuel,
          km: action.km,
          nextKm: action.nextKm,
          createdAt: action.createdAt,
        },
        selectOwner: action.selectOwner,
      }
    case vehicleActionType.RECEIVE_VEHICLES:
      return {
        ...state,
        vehicleArray: action.vehiclesArray.map(item => item),
        vehicleArrayClone: action.vehiclesArray.map(item => item),
      }
    case vehicleActionType.DID_SAVED_VEHICLE:
      return {
        ...state,
        didSaved: action.didSaved,
      }
    case vehicleActionType.RESET_STAGE_VEHICLE:
      return {
        ...state,
        vehicle:{
          customer_id: '',
          brand: '',
          model: '',
          year: '',
          typeFuel: '',
          numberPlace: '',
          km: '',
          nextKm: ''
        }
      }
    case vehicleActionType.FILTER_VEHICLE:
      let filterVehicle = state.vehicleArrayClone.filter((item) => {
        if (item.numberPlace.toLocaleLowerCase().includes(action.filter.toLocaleLowerCase())) {
          return item;
        }
      });

      let noMatch = false;
      filterVehicle.length === 0 ? noMatch = true : noMatch = false;
      return {
        ...state,
        vehicleArray: filterVehicle.map(item => item),
        isNoMatch: noMatch,
      }
    case vehicleActionType.ADD_VEHICLE_ITEM:
      return {
        ...state,
        vehicle:{
          ...state.vehicle,
          [action.property]: action.value,
        }
      }
    case vehicleActionType.TOGGLE_VEHICLE_FORM:
      return {
        ...state,
        isShowVehicleForm: !state.isShowVehicleForm,
      }
    case vehicleActionType.ADD_VEHICLE_ERRORS:
      return {
        ...state,
        vehicleErrors: [
          ...state.vehicleErrors,
          action.errors.map(item => item),
        ],
      }
    default:
      return state;
  }
}
