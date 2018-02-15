import React from 'react';
import sinon from 'sinon';
import { completeMount } from '../utils';


import App from '../../components/App.js';
import * as request from '../../services/request';

describe('Login integration test', () => {

    it('redirects without saved settings', () => {
        const { wrapper } = completeMount(App).make();

        wrapper.find('.LoginForm').simulate('submit');

        expect(wrapper.find('.App__header').text()).toContain('Configurações');
    });

    it('makes login with id and settings', () => {
        const settings = { 
            url: 'http://httpbin.org', 
            params: { id: '#ID#' } 
        };
        const id = '12345678';        

        const { wrapper }  = completeMount(App).state({ settings }).make();
        
        const requestLoginStub = sinon.stub(request, 'requestLogin')
            .returns(new Promise(resolve => {
                resolve({ request: { responseURL: 'http://test.com' }});
            }));

        wrapper.find('#id').instance().value = id;
        wrapper.find('.LoginForm').simulate('submit');

        expect(requestLoginStub.withArgs(settings.url, settings.params, id).calledOnce).toBe(true);
    });

});