export const ALERT_SET_MESSAGE = 'alert/SET_MESSAGE';
export const ALERT_CLEAR_MESSAGE = 'alert/CLEAR_MESSAGE';

export const TYPE_INFO = 'info';
export const TYPE_SUCCESS = 'success';
export const TYPE_ERROR = 'error';

export const DELAY_FAST = 2000;
export const DELAY_MEDIUM = 5000;
export const DELAY_SLOW = 8000;

export const setMessage = (type, message) => ({ type: ALERT_SET_MESSAGE, payload: { type, message } });
export const clearMessage = () => ({ type: ALERT_CLEAR_MESSAGE });

export const setDelayedMessage = (delay, type, message) => dispatch => {
    dispatch(setMessage(type, message));

    setTimeout(() => { dispatch(clearMessage()); }, delay);
};