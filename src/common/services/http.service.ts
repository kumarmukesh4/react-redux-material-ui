import axios, {
	AxiosRequestConfig,
	AxiosError,
	AxiosResponse,
	AxiosPromise,
} from 'axios';

declare var window: any;

class HttpService {
    service: HttpService;
    constructor() {
        let service = null;
        if (!window.HttpService) {
            service = axios.create();
			service.interceptors.request.use(
				this.handleRequestSuccess,
				this.handleRequestError
			);
			service.interceptors.response.use(
				this.handleResponseSuccess,
				this.handleResponseError
			);
			window.HttpService = service;
        }    
        this.service = window.HttpService;
    }

    // HTTP interceptor handlers
	handleRequestSuccess = (config: AxiosRequestConfig) => {
		// Do something before request is sent
		return config;
	};
	handleRequestError = (error: AxiosError) => {
		// Do something with request error
		return Promise.reject(error);
	};
	handleResponseSuccess = (response: AxiosResponse) => {
		return response;
    };

    handleResponseError = (error: AxiosError) => {
		try {
			const status = error?.response?.status;
			const msg =
				error?.response?.data ||
				error?.response?.statusText ||
				'Something went wrong.Please try again.';
			switch (status) {
				case 400:
					window.location.href = `/error?msg=${msg}`;
					break;
				case 401:
					window.location.href = `/error?msg=${msg}`;
					break;
				case 404:
					window.location.href = `/error?msg=${msg}`;
					break;
				default:
					break;
			}
			// errorLog.log(status);
			return Promise.reject(error);
		} catch (e) {
			console.log(error.response);
		}
	};

}

const http = new HttpService();
const httpInstance = window.HttpService || null;

export { http, httpInstance };