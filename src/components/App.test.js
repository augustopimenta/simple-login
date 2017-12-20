import React from 'react';
import { MemoryRouter as Router, withRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';

import App from './App';

describe('<App />', () => {
    const mockStore = configureStore([thunk]);

    let wrapper;
    let app;

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
                    <App wrappedComponentRef={ref => app = ref} />
                </Router>
            </Provider>
        );
    };

    beforeEach(() => {
        wrapper = createStoreAndMount();
    });

    it('renders without crashing', () => {
        expect(wrapper).toBeTruthy();
    });

    it('renders settings route', () => {
        app.getWrappedInstance().goToSettings();
        wrapper.update();
        
        expect(wrapper.find('.SettingsForm').exists()).toBe(true);
    });

    it('renders login route', () => {
        app.getWrappedInstance().goToSettings();
        app.getWrappedInstance().goToMain();
        wrapper.update();
        
        expect(wrapper.find('.LoginForm').exists()).toBe(true);
    });
});
