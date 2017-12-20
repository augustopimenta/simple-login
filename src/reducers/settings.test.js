import reducer from './settings';
import * as settings from '../actions/settings';

describe('Settings reducer', () => {

    it('handle SETTINGS_SET_DATA', () => {
        const url = 'http://test.io/login';
        const params = { id: '#ID#' };

        const state = reducer(undefined, settings.setData({ url, params }));

        expect(state).toEqual({ url, params });
    });

});