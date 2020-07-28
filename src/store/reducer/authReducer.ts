import {
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAIL,
    AUTH_LOGOUT
} from '../action/action'

const initialState = {
    token: '',
    userInfo: '',
    error: '',
    loading: false,
    authRedirectPath: '/dashboard'
}

function authReducer(state = initialState, action: any) {
    switch (action.type) {
        case AUTH_START:
            return {
                ...state,
                error: null,
                loading: true
            }
        case AUTH_SUCCESS:
            return {
                ...state,
                token: action.idToken,
                userInfo: action.userInfo,
                error: null,
                loading: false
            }
        case AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userInfo: null,
                loading: false
            }
        default: return state
    }
    return state;
}

export default authReducer;