import reducer from './alert';
import * as alert from '../actions/alert';

describe('Alert reducer', () => {

    it('handle ALERT_SET_MESSAGE', () => {
        const type = alert.TYPE_SUCCESS;
        const message = 'Message';

        const state = reducer(undefined, alert.setMessage(type, message));

        expect(state).toEqual({ type, message});
    });

    it('handle ALERT_CLEAR_MESSAGE', () => {
        const type = alert.TYPE_SUCCESS;
        const message = 'Message';

        const state = reducer({ type, message }, alert.clearMessage());

        expect(state).toEqual({ type: null, message: "" });
    });

});