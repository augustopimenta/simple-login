import React from 'react';
import { MemoryRouter as Router, withRouter } from 'react-router-dom';

import { App } from './App';

describe('<App />', () => {
    let wrapper;
    let app;

    beforeEach(() => {
        const props = {
            alert: { type: null, message: "" }
        };

        const AppWithRouter = withRouter(App);

        wrapper = shallow(
            <Router>
                <AppWithRouter wrappedComponentRef={ref => app = ref} {...props} />
            </Router>
        );
    });

    it('renders without crashing', () => {
        console.log(wrapper.html());
        expect(wrapper).toBeTruthy();
    });

    // it('renders settings route', () => {
    //     app.goToSettings();
    //     // app.getWrappedInstance().goToSettings();
    //     wrapper.update();
        
    //     expect(wrapper.find('.SettingsForm').exists()).toBe(true);
    // });

    // it('renders login route', () => {
    //     app.getWrappedInstance().goToSettings();
    //     app.getWrappedInstance().goToMain();
    //     wrapper.update();
        
    //     expect(wrapper.find('.LoginForm').exists()).toBe(true);
    // });
});
