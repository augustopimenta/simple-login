import React from 'react';
import Alert from './Alert';

describe('<Alert />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Alert type="info" message="" />);
    });

    it('renders without crashing', () => { 
        expect(wrapper).toBeTruthy();
    });

    it('displays message of prop', () => {
        const message = 'Custom message';
        
        wrapper.setProps({ message });
    
        expect(wrapper.text()).toBe(message);
        expect(wrapper.find('.Alert--visible').exists()).toBe(true);
    });

    it('stays hidden with an empty message', () => {
        expect(wrapper.find('.Alert--visible').exists()).toBe(false);
    });
});
