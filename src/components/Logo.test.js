import React from 'react';
import Logo from './Logo';

describe('<Logo />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Logo />);
    });

    it('renders without crashing', () => {
        expect(wrapper).toBeTruthy();
    });

    it('display title after logo', () => {
        const title = 'Configs';
        wrapper.setProps({ title });
    
        expect(wrapper.text()).toContain(title);
    });
});
