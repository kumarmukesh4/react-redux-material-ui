import {
    GET_APPOINTMENT_LIST_START,
    GET_APPOINTMENT_LIST_SUCCESS,
    GET_APPOINTMENT_LIST_FAIL,
    LOGIN_SUCCESS
} from '../action/action'

const initialState = {
    isAuthenticated: false
}

function authReducer(state = initialState, action: any) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        default: return state
    }
    return state;
}

export default authReducer;