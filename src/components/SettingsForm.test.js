import React from 'react';
import SettingsForm from './SettingsForm';
import Button from './Button';
import sinon from 'sinon';

describe('<SettingsForm />', () => {
    let wrapper;
    let onSubmitForm;
    let onBack;
    const data = {
        form: { url: null, params: null },
        errors: { url: null, params: null }
    };

    beforeEach(() => {
        onSubmitForm = sinon.spy();
        onBack = jest.fn();

        wrapper = shallow(<SettingsForm onSubmit={onSubmitForm} data={data} onBack={onBack} loading={false} />);
    });

    it('renders without crashing', () => {
        expect(wrapper).toBeTruthy();
    });
    
    it('can be disabled when is loading', () => {
        wrapper.setProps({ loading: true })

        expect(wrapper.find('.SettingsForm__input[disabled]').length).toBe(2);
    });

    it('calls submit event', () => {
        const url = 'http://test.com/login';
        const params = '{"id": "#ID#", "role": 2}';
        
        const wrapper = mount(<SettingsForm onSubmit={onSubmitForm} data={data} onBack={onBack} loading={false} />);
        wrapper.find('input').instance().value = url;
        wrapper.find('textarea').instance().value = params;
        wrapper.simulate('submit');

        const form = onSubmitForm.getCall(0).args[0].target;

        expect(onSubmitForm.calledOnce).toBe(true);
        expect(form.elements.url.value).toBe(url);
        expect(form.elements.params.value).toBe(params);
    });

    it('calls back event', () => {
        wrapper.find(Button).at(0).simulate('click');

        expect(onBack).toBeCalled();
    });

    it('displays form filled with data prop', () => {
        const url = 'http://test.com/login';
        const params = {id: '#ID#', role: 2};

        const wrapper = mount(<SettingsForm onSubmit={onSubmitForm} data={{ ...data, form: { url, params }}} onBack={onBack} loading={false} />);

        const urlInput = wrapper.find('input').instance();
        const paramsTextarea = wrapper.find('textarea').instance();

        expect(urlInput.value).toBe(url);
        expect(paramsTextarea.value).toBe(JSON.stringify(params, null, 4));
    });

    it('displays form errors', () => {
        const error = 'Campo Obrigatório';
        wrapper.setProps({ data: { ...data, errors: { url: error, params: error }}});

        expect(wrapper.find('.SettingsForm__error').map(e => e.text())).toEqual([error, error]);
    });
})
