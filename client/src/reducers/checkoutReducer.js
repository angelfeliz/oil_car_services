import * as checkoutActionType from '../actions/checkoutAction';

let stateDefault = {
    _id: '',
    sell: [/*{
    services_id: '',
    paymentType: '',
    firstName: '',
    lastName: '',
    services: '',
    products:[],
    phoneNumber: '',
    vehicle:{}
    total: ''}*/
        ],
    sellClone: [],
    checkoutItem: {
      products:[]
    },
    isModalVisible: false,
    isRidirectToInvoice: false,
    isAbortBySystem: false,
    isNoMatch: false
}

export const checkoutMaching = (state = stateDefault, action) => {
    switch (action.type) {
        case checkoutActionType.FIND_SELL_CHECKOUT:
            let filterSell = state.sellClone.filter((item) => {
                if (item.services_id) {
                    let fullName = item.firstName + " " + item.lastName;
                    if (fullName.toLowerCase().includes(action.word.toLowerCase())) {
                        return item;
                    }
                }
            });

            let noMatch = false;
            filterSell.length === 0
                ? noMatch = true
                : noMatch = false;
            return {
                ...state,
                sell: filterSell.map(item => item),
                isNoMatch: noMatch
            }
        case checkoutActionType.SET_SELL:
            let setSell = [];
            if (action.sellType === "cambio aceite") {
                setSell = action.sell.map((item) => {
                    return {
                        services_id: item._id,
                        paymentType: item.paymentType,
                        services: action.sellType,
                        firstName: item.customer.firstName,
                        lastName: item.customer.lastName,
                        totalNeto: item.totalNeto,
                        phoneNumber: item.customer.phoneNumber,
                        products: [...item.products.map(pro => pro)],
                        vehicle: {
                            ...item.vehicle
                        }
                    }
                })
            }

            if (action.sellType === "general") {
                setSell = action.sell.map((item) => {
                    return {
                        services_id: item._id,
                        paymentType: item.paymentType,
                        services: action.sellType,
                        firstName: item.customer.firstName,
                        lastName: item.customer.lastName,
                        totalNeto: item.totalNeto,
                        phoneNumber: item.customer.phoneNumber,
                        products: [...item.products.map(pro => pro)]
                    }
                })
            }

            return {
                ...state,
                sell: [
                    ...state.sell,
                    ...setSell.map(item => item)
                ],
                sellClone: [
                    ...state.sell,
                    ...setSell.map(item => item)
                ]
            }
        case checkoutActionType.PROCESS_CHECKOUT:
            return {
                ...state,
                checkoutItem: {
                    ...action.checkoutObj,
                    products:[...action.checkoutObj.products.map(item => item)]
                },
                isModalVisible: true,
                isRidirectToInvoice: false,
                isAbortBySystem: false
            }
        case checkoutActionType.TOGGLE_CHECK_FOR_CHECKOUT:
            return {
                ...state,
                isModalVisible: !state.isModalVisible
            }
        case checkoutActionType.ABORT_CHECKOUT_SYSTEM:
            return {
                ...state,
                isAbortBySystem: true,
                isModalVisible: false
            }
        case checkoutActionType.STOP_ABORT_CHECKOUT_SYSTEM:
            return {
                ...state,
                isAbortBySystem: false,
                isModalVisible: false
            }
        case checkoutActionType.CONFIRMED_CHECKOUT:
            return {isModalVisible: true, isRidirectToInvoice: false}
        default:
            return state;
    }
}
