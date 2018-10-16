import * as actionTypes from './actionTypes';
import * as url from '../constants/urls';

const initialState = {
    auth: false,
    main_url: url.MAIN_URL
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTHORIZE:
            return {...state, auth: true};
        
        case actionTypes.SET_IP_ADDRESS: 
            const main_url = url.MAIN_URL_PREFIX + action.ip_address + url.MAIN_URL_SUFFIX;
            return {...state, main_url: main_url};

        default:
            return state;
    }
};

export default reducer;