import { LOADING_SHOW, LOADING_HIDE } from "../actions/loading";

const initialState = {
    enable: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADING_SHOW:
            return { ...state, enable: true };
        case LOADING_HIDE:
            return { ...state, enable: false };
        default:
            return state;
    }
};