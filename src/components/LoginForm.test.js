import React from 'react';
import sinon from 'sinon';
import { MemoryRouter as Router, withRouter } from 'react-router-dom';

import * as request from '../services/request';
import { LoginForm } from './LoginForm';

describe('<LoginForm />', () => {
    let wrapper;

    beforeEach(() => {
        const props = {
            loading: { enabled: false }, 
            settings: { url: null, params: null },
            dispatch: jest.fn()
        };

        wrapper = mount(<LoginForm {...props} />);
    });

    it('renders without crashing', () => {
        expect(wrapper).toBeTruthy();
    });
    
    it('can be disabled when is loading', () => {
        wrapper.setProps({ loading: { enabled: true} });

        expect(wrapper.find('.LoginForm__input[disabled]').exists()).toBe(true);
    });

    it('redirects if without settings', () => {
        const component = wrapper.instance();

        const authenticateSpy = sinon.spy(component, 'authenticate');
        const goToSettingsStub = sinon.stub(component, 'goToSettings');

        wrapper.simulate('submit');        

        expect(authenticateSpy.calledOnce).toBe(true);
        expect(goToSettingsStub.calledOnce).toBe(true);        
    });

    it('makes request to authenticate', () => {
        const component = wrapper.instance();

        wrapper.setProps({ settings: { url: 'http://test.com/login', params: { id: '#ID#' }} });

        const authenticateSpy = sinon.spy(component, 'authenticate');
        const requestLoginStub = sinon.stub(request, 'requestLogin')
            .returns(new Promise(resolve => {
                resolve({ request: { responseURL: 'http://test.com' }});
            }));
        
        wrapper.simulate('submit');

        expect(authenticateSpy.calledOnce).toBe(true);
        expect(requestLoginStub.calledOnce).toBe(true);
    });
})
