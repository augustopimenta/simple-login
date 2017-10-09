import { ALERT_SET_MESSAGE, ALERT_CLEAR_MESSAGE } from '../actions/alert';

const initialState = {
    type: null,
    message: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ALERT_SET_MESSAGE:
            return { ...state, type: action.payload.type, message: action.payload.message };
        case ALERT_CLEAR_MESSAGE:
            return { ...state, type: null, message: '' };
        default:
            return state;
    }
};