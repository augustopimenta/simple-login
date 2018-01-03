import React from 'react';
import sinon from 'sinon';
import { MemoryRouter as Router, withRouter } from 'react-router-dom';

import { SettingsForm } from './SettingsForm';
import Button from './Button';

describe('<SettingsForm />', () => {

    let wrapper;

    const mountWrapperWith = (merge = {}) => {
        const props = {
            loading: false, 
            settings: { url: null, params: null },
            dispatch: jest.fn(),
            ...merge
        };

        return mount(<SettingsForm {...props} />);
    }

    beforeEach(() => {
        wrapper = mountWrapperWith();
    })

    it('renders without crashing', () => {
        expect(wrapper).toBeTruthy();
    });
    
    it('can be disabled when is loading', () => {
        wrapper.setProps({ loading: false });

        expect(wrapper.find('.SettingsForm__input[disabled]').length).toBe(2);
    });

    it('validates form', () => {
        wrapper.simulate('submit');

        expect(wrapper.find('.SettingsForm__error').length).toBe(2);
    });

    it('calls back event', () => {
        const component = wrapper.instance();

        const goToMainStub = sinon.stub(component, 'goToMain');

        wrapper.find(Button).at(0).simulate('click');

        expect(goToMainStub.calledOnce).toBe(true);
    });

    it('displays form filled with data prop', () => {
        const url = 'http://test.com/login';
        const params = {id: '#ID#', role: 2};

        wrapper = mountWrapperWith({ settings: { url, params } });

        const urlInput = wrapper.find('input').instance();
        const paramsTextarea = wrapper.find('textarea').instance();

        expect(urlInput.value).toBe(url);
        expect(paramsTextarea.value).toBe(JSON.stringify(params, null, 4));
    });

    it('stores new settings', (done) => {
        wrapper = mountWrapperWith({ settings: { 
            url: 'http://test.com/login', 
            params: {id: '#ID#', role: 2} 
        } });

        const component = wrapper.instance();
        
        const storeSettingsSpy = sinon.spy(component, 'storeSettings');
        const goToMainStub = sinon.stub(component, 'goToMain');
           
        wrapper.simulate('submit');

        setTimeout(() => {
            expect(storeSettingsSpy.calledOnce).toBe(true);
            expect(goToMainStub.calledOnce).toBe(true);
            done();
        }, 2000);       
    });

});
