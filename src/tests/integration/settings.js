import React from 'react';
import sinon from 'sinon';

import { completeMount } from '../utils';
import App from '../../components/App.js';

describe('Settings integration test', () => {

    it('save valid settings', (done) => {
        const settings = { 
            url: 'http://httpbin.org', 
            params: { id: '#ID#' } 
        };

        const { wrapper, store } = completeMount(App).url(['/settings']).make();

        wrapper.find('#url').instance().value = settings.url;
        wrapper.find('#params').instance().value = JSON.stringify(settings.params);
        wrapper.find('.SettingsForm').simulate('submit');

        setTimeout(() => {
            expect(store.getState().settings).toEqual(settings);
            done();            
        }, 2000);
    });

    it('starts with saved settings', () => {
        const settings = { 
            url: 'http://httpbin.org', 
            params: { id: '#ID#' } 
        };

        const { wrapper, store } = completeMount(App).url(['/settings']).state({ settings }).make();

        expect(wrapper.find('#url').instance().value).toBe(settings.url);
        expect(wrapper.find('#params').instance().value).toBe(JSON.stringify(settings.params, null, 4));
    });

});