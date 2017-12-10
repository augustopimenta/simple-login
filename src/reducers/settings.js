import { SETTINGS_SET_DATA } from "../actions/settings";

const initialState = {
    url: null,
    params: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SETTINGS_SET_DATA:
            return { 
                ...state,
                url: action.payload.url,
                params: action.payload.params
            };
        default:
            return state;
    }
};