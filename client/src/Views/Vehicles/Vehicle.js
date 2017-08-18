import React, { Component } from 'react';
import VehicleList from './VehicleList';
import VehicleForm from './VehicleForm';


import {connect} from 'react-redux';
import api from '../../api';
import * as vehicleAction from '../../actions/vehicleAction';
import * as customerAction from '../../actions/customerAction';
import validateVehicle from '../../utils/Validations/validatedVehicle';
import * as alerts from '../util/Alerts';
import HeadAutoComplete from '../util/HeadAutoComplete';
import VehicleField from './VehicleField';


const Vehicle = () => (
   <div>
     <VehicleForm />
     <VehicleList />
   </div>
)

export default Vehicle
