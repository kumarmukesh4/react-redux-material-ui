import axios from 'axios';
import { API_URL } from '../../common/config'
import { localStore } from './../../common/services';
import {
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAIL,
    AUTH_LOGOUT
} from './action'

const authStart = () => {
    return {
        type: AUTH_START,
        loading: true
    };
}

const authSuccess = (token: string, user: any) => {
    return {
        type: AUTH_SUCCESS,
        idToken: token,
        userInfo: user,
        loading: false
    };
}

const authFail = (error: any) => {
    return {
        type: AUTH_FAIL,
        error: error,
        loading: false
    };
}


// logout
const logout = () => {
    //logout from SSO
    const AUTH_TOKEN_VAL = localStore.get('AUTH_TOKEN') || '';

    localStore.remove('AUTH_TOKEN');
    localStore.remove('USER_INFO');

    return {
        type: AUTH_LOGOUT,
    };
};

// get token
const auth = () => {
    return (dispatch: any) => {
        dispatch(authStart());
        let url = API_URL['LOGIN'];

        axios({
            method: 'post',
            url: url,
            data: {
                "email": "himanshunagpal25061992@gmail.com",
                "password": "12345678"
            }
        })
            .then((res) => {
                let userdata = res.data;

                localStore.set('AUTH_TOKEN', userdata.data.token);

                const userInfo = {
                    fName: userdata.data.fname,
                    lname: userdata.data.lname,
                    patientId: userdata.data.patient_id,
                    mail: userdata.data.mail
                };

                localStore.set('USER_INFO', JSON.stringify(userInfo));
                dispatch(authSuccess(userdata.data.token, userInfo));

                console.log(res);

            }, (error) => {
                dispatch(authFail(error));
            });
    }
}


//check auth state for token is valid
const authCheckState = () => {
    return (dispatch: any) => {
        const token = localStore.get('AUTH_TOKEN');
        if (!token) {
            dispatch(logout());
        } else {
            const userInfo = localStore.get('USER_INFO')
                ? JSON.parse(localStore.get('USER_INFO'))
                : '';
            dispatch(authSuccess(token, userInfo));
        }
    };
};

export {
    auth,
    authSuccess,
    authCheckState,
    logout
}

