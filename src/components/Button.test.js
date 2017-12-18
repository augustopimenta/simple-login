import React from 'react';
import Button from './Button';

describe('<Button />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Button type="button">Ok</Button>);
    });

    it('renders without crashing', () => {
        expect(wrapper).toBeTruthy();
    });
    
    it('renders children', () => {
        const children = 'Go back';
        
        wrapper.setProps({ children });
    
        expect(wrapper.text()).toBe(children);
    });

    it('shows spinner when loading', () => {
        wrapper.setProps({ loading: true });
    
        expect(wrapper.find('.Button__spinner').exists()).toBe(true);
    });

    it('can be disabled', () => {
        wrapper.setProps({ disabled: true });
    
        expect(wrapper.is('[disabled]')).toBe(true);
    });
})




