import { API_BASE_PATH } from '../constant/constants';

const API_URL = {
    LOGIN: `${API_BASE_PATH()}/login`,
    APPOINTENTS: `${API_BASE_PATH()}/getUpcomingAppointments`  //'http://localhost:3000/appointments'
}    

export {
    API_URL
}
