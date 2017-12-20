import reducer from './loading';
import * as loading from '../actions/loading';

describe('Loading reducer', () => {

    it('handle LOADING_SHOW', () => {
        const state = reducer(undefined, loading.show());

        expect(state).toEqual({ enable: true });
    });

    it('handle LOADING_HIDE', () => {
        const state = reducer({ enable: true }, loading.hide());

        expect(state).toEqual({ enable: false });
    });

});