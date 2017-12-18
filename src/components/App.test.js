import React from 'react';
import App from './App';
import { MemoryRouter as Router, withRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

describe('<App />', () => {
    let wrapper;
    let app;

    beforeEach(() => {
        const store = createStore(reducers, applyMiddleware(thunk));

        wrapper = mount(
            <Provider store={store}>
                <Router>
                    <App wrappedComponentRef={ref => app = ref} />
                </Router>
            </Provider>
        );
    });

    it('renders without crashing', () => {
        expect(wrapper).toBeTruthy();
    });

    it('renders login route', () => {
        expect(wrapper.find('.LoginForm').exists()).toBe(true);
    });

    it('renders settings route', () => {
        app.getWrappedInstance().goToSettings();
        wrapper.update();
        
        expect(wrapper.find('.SettingsForm').exists()).toBe(true);
    });
});
