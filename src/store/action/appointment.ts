import axios from 'axios';
import { API_URL } from '../../common/config'

import {
    GET_APPOINTMENT_LIST_START,
    GET_APPOINTMENT_LIST_SUCCESS,
    GET_APPOINTMENT_LIST_FAIL
} from './action'
import { localStore } from '../../common/services';

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
    const token = localStore.get('AUTH_TOKEN') || '';
    const userInfo = JSON.parse(localStore.get('USER_INFO') || '');

    return (dispatch: any) => {
        dispatch(getAppointmentListStart());
        let url = API_URL['APPOINTENTS'];

        axios({
            method: 'post',
            url: url,
			headers: {
                Authorization: `JWT ${token}`
            },
            data: {
                "patient_id": userInfo.userId //'247439'
            }
        })
        .then((res) => {
            dispatch(getAppointmentListSuccess(res.data.data));
          }, (error) => {
            dispatch(getAppointmentListFail());
        }); 
    }    
}
export {
    getAppointment
}
