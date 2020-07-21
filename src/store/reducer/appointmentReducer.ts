import {
    GET_APPOINTMENT_LIST_START,
    GET_APPOINTMENT_LIST_SUCCESS,
    GET_APPOINTMENT_LIST_FAIL
} from '../action/action'

const initialState = {
    appointmentList: [],
    loading: false
}

function appointmentReducer(state = initialState, action: any) {
    switch (action.type) {
        case GET_APPOINTMENT_LIST_START:
            return {
                ...state,
                loading: true
            }
        case GET_APPOINTMENT_LIST_SUCCESS:
            return {
                ...state,
                appointmentList: action.payload,
                loading: false
            }
        case GET_APPOINTMENT_LIST_FAIL:
            return {
                ...state,
                loading: false
            }
        default: return state
    }
    return state;
}

export default appointmentReducer;