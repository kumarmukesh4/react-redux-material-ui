import axios from 'axios';

import {
    GET_APPOINTMENT_LIST_START,
    GET_APPOINTMENT_LIST_SUCCESS,
    GET_APPOINTMENT_LIST_FAIL
} from './action'

const getAppointmentListStart = () => {
    return  {
        type: GET_APPOINTMENT_LIST_START,
        loading: true
    }    
}

const getAppointmentListSuccess = (payload: any) => {
    return (dispatch: any) => {
        dispatch({
            type: GET_APPOINTMENT_LIST_SUCCESS,
            payload: payload,
            loading: false
        })
    } 
}

const getAppointmentListFail = () => {
    return {
        type: GET_APPOINTMENT_LIST_SUCCESS,
        loading: false
	};   
}

const getAppointment = () => {
    return (dispatch: any) => {
        dispatch(getAppointmentListStart());
        axios.get('http://localhost:3003/appointments')   
            .then((res) => {
                dispatch(getAppointmentListSuccess(res.data));
            }) 
            .catch((err) => {
                dispatch(getAppointmentListFail());
            })
            .then(() => {
                console.log("Always executed");
            })
    }    
}
export {
    getAppointment
}
