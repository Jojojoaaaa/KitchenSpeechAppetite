import * as actionTypes from './actionTypes';

export const authorize = () => {
    return {
        type: actionTypes.AUTHORIZE
    };
};

export const setIpAddress = (ip_address) => {
    return {
        type: actionTypes.SET_IP_ADDRESS,
        ip_address: ip_address
    }
}