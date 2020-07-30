import { API_BASE_PATH } from '../constant/constants';

const API_URL = {
    LOGIN: `${API_BASE_PATH()}/login`,
    APPOINTENTS: `${API_BASE_PATH()}/getUpcomingAppointments`,  //'http://localhost:3000/appointments'
    FORGOT_PASSWORD: `${API_BASE_PATH()}/forgotpasswordAction`,
    CHECK_OTP: `${API_BASE_PATH()}/checkOtp`,
    SAVE_RESET_PASSWORD: `${API_BASE_PATH()}/saveResetPassAction`,
    
}    

export {
    API_URL
}
