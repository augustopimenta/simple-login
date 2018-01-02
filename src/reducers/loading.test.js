import reducer from './loading';
import * as loading from '../actions/loading';

describe('Loading reducer', () => {

    it('handle LOADING_SHOW', () => {
        const state = reducer(undefined, loading.show());

        expect(state).toEqual({ enabled: true });
    });

    it('handle LOADING_HIDE', () => {
        const state = reducer({ enabled: true }, loading.hide());

        expect(state).toEqual({ enabled: false });
    });

});