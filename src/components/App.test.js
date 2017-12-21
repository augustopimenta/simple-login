import React from 'react';
import { MemoryRouter as Router, withRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'

import App from './App';

describe('<App />', () => {
    
    const mountWithRedux = (state = {}, routerProps = {}) => {
        const defaultStore = {
            alert: { type: null, message: '' }, 
            loading: { enabled: false }, 
            settings: { url: null, params: null },
            ...state
        };

        const store = configureStore([thunk])(defaultStore);
        
        let component;
        const wrapper = mount(
            <Provider store={store}>
                <Router {...routerProps}>
                    <App wrappedComponentRef={ref => component = ref.getWrappedInstance()} />
                </Router>
            </Provider>
        );

        return { wrapper, component };
    };

    it('renders without crashing', () => {
        const { wrapper } = mountWithRedux();
        expect(wrapper).toBeTruthy();
    });

    it('renders settings route', () => {
        const { wrapper, component } = mountWithRedux();

        component.goToSettings();
        wrapper.update();
        
        expect(wrapper.find('.SettingsForm').exists()).toBe(true);
    });

    it('renders login route', () => {
        const { wrapper, component } = mountWithRedux({}, {initialEntries: ['/settings'] });

        component.goToMain();
        wrapper.update();
        
        expect(wrapper.find('.LoginForm').exists()).toBe(true);
    });
});
