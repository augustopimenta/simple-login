import React from 'react';
import sinon from 'sinon';

import { MemoryRouter as Router, withRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';

import * as request from '../services/request';
import LoginForm from './LoginForm';


describe('<LoginForm />', () => {
    let comp;
    const mockStore = configureStore([thunk]);

    const createStoreAndMount = (update = {}) => {
        let initialStore = {
            alert: { type: null, message: '' }, 
            loading: { enabled: false }, 
            settings: { url: null, params: null } 
        };

        const store = mockStore({ ...initialStore, ...update });
        
        return mount(
            <Provider store={store}>
                <Router>
                    <LoginForm wrappedComponentRef={ref => comp = ref} />
                </Router>
            </Provider>
        );
    };

    it('renders without crashing', () => {
        const wrapper = createStoreAndMount();

        expect(wrapper).toBeTruthy();
    });
    
    it('can be disabled when is loading', () => {
        const wrapper = createStoreAndMount({ loading: { enabled: true } });

        expect(wrapper.find('.LoginForm__input[disabled]').exists()).toBe(true);
    });

    it('redirects if without settings', () => {
        const wrapper = createStoreAndMount();

        const loginForm = comp.getWrappedInstance();

        const authenticateSpy = sinon.spy(loginForm, 'authenticate');
        const goToSettingsSpy = sinon.spy(loginForm, 'goToSettings');

        wrapper.simulate('submit');        

        expect(authenticateSpy.calledOnce).toBe(true);
        expect(goToSettingsSpy.calledOnce).toBe(true);        
    });

    it('makes request to authenticate', () => {
        const wrapper = createStoreAndMount({ settings: { url: 'http://test.com/login', params: { id: '#ID#' }} })

        const loginForm = comp.getWrappedInstance();

        const authenticateSpy = sinon.spy(loginForm, 'authenticate');
        const requestLoginStub = sinon.stub(request, 'requestLogin')
            .returns(new Promise(resolve => {
                resolve({ request: { responseURL: 'http://test.com' }});
            }));
        
        wrapper.simulate('submit');

        expect(authenticateSpy.calledOnce).toBe(true);
        expect(requestLoginStub.calledOnce).toBe(true);
    });
})
