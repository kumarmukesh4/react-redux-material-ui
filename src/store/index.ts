import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';

import { AppointmentReducer } from './reducer';

declare var window: any;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(AppointmentReducer, composeEnhancers(applyMiddleware(thunk)));

export default store