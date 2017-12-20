import React from 'react';
import sinon from 'sinon';

import { MemoryRouter as Router, withRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';

import SettingsForm from './SettingsForm';
import Button from './Button';

describe('<SettingsForm />', () => {
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
                    <SettingsForm wrappedComponentRef={ref => comp = ref} />
                </Router>
            </Provider>
        );
    };

    it('renders without crashing', () => {
        const wrapper = createStoreAndMount();

        expect(wrapper).toBeTruthy();
    });
    
    it('can be disabled when is loading', () => {
        const wrapper = createStoreAndMount({ loading: { enabled: true }});

        expect(wrapper.find('.SettingsForm__input[disabled]').length).toBe(2);
    });

    it('stores new settings', () => {
        const wrapper = createStoreAndMount({ settings: { url: 'http://test.com/login', params: { id: '#ID#', role: 2 }} })
        
        const settingsForm = comp.getWrappedInstance();

        const storeSettingsSpy = sinon.spy(settingsForm, 'storeSettings');
        const goToMainSpy = sinon.spy(settingsForm, 'goToMain');
           
        wrapper.simulate('submit');

        expect(storeSettingsSpy.calledOnce).toBe(true);
        expect(goToMainSpy.calledOnce).toBe(true);
    });

    it('calls back event', () => {
        const wrapper = createStoreAndMount();
        const settingsForm = comp.getWrappedInstance();
        const goToMainSpy = sinon.spy(settingsForm, 'goToMain');

        wrapper.find(Button).at(0).simulate('click');

        expect(goToMainSpy.calledOnce).toBe(true);
    });

    it('displays form filled with data prop', () => {
        const url = 'http://test.com/login';
        const params = {id: '#ID#', role: 2};

        const wrapper = createStoreAndMount({ settings: { url, params }});

        const urlInput = wrapper.find('input').instance();
        const paramsTextarea = wrapper.find('textarea').instance();

        expect(urlInput.value).toBe(url);
        expect(paramsTextarea.value).toBe(JSON.stringify(params, null, 4));
    });

    it('validates form', () => {
        const wrapper = createStoreAndMount();

        wrapper.simulate('submit');

        expect(wrapper.find('.SettingsForm__error').length).toBe(2);
    });
})
