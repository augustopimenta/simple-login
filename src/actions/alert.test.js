import thunk from 'redux-thunk';
import reducers from '../reducers';
import { createStore, applyMiddleware } from 'redux';

import * as alert from './alert';

describe('Alert async actions', () => {

    it('setDelayedMessage', (done) => {
        const store = createStore(reducers, applyMiddleware(thunk));

        const delay = 500;
        const type = alert.TYPE_SUCCESS;
        const message = 'Ok';

        store.dispatch(alert.setDelayedMessage(delay, type, message));

        const state = store.getState();
        expect(state.alert).toEqual({ type, message });

        setTimeout(() => {
            const state = store.getState();
            expect(state.alert).toEqual({ type: null, message: '' });
            done();
        }, 600);
    });

});