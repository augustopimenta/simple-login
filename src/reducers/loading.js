import { LOADING_SHOW, LOADING_HIDE } from "../actions/loading";

const initialState = {
    enabled: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADING_SHOW:
            return { ...state, enabled: true };
        case LOADING_HIDE:
            return { ...state, enabled: false };
        default:
            return state;
    }
};