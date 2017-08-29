import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import Select, { Option } from './index';

describe('<Select />', () => {
  test('data is valid', () => {
    const wrapper = mount(<Select data={[1, 2, 3]} />);
    expect(wrapper.find('Select').length).toBe(1);
    wrapper.find('SelectTrigger').simulate('click');
    const pop = new ReactWrapper(wrapper.instance().popup, true);
    expect(pop.find('Option').length).toBe(3);
  });

  test('Option is valid', () => {
    let wrapper = mount(
      <Select>
        <Option value="1">hello</Option>
        <Option value="2">bye</Option>
      </Select>,
    );
    expect(wrapper.find('Select').length).toBe(1);
    wrapper.find('SelectTrigger').simulate('click');
    const pop = new ReactWrapper(wrapper.instance().popup, true);
    expect(pop.find('Option').length).toBe(2);

    // HACK: branch
    wrapper = mount(
      <Select>
        <Option>Hey</Option>
      </Select>,
    );
  });

  test('default attributes', () => {
    const wrapper = mount(<Select />);
    expect(wrapper.prop('disabled')).toBe(false);
    expect(wrapper.prop('optionText')).toBe('text');
    expect(wrapper.prop('optionValue')).toBe('value');
    expect(wrapper.prop('prefix')).toBe('boldrui');
    expect(wrapper.prop('filter')).toBe(undefined);
    expect(wrapper.prop('selectedItem').value).toBe('');
    expect(wrapper.prop('selectedItem').text).toBe('');
  });

  it('SimpleTrigger', () => {
    const wrapper = mount(<Select data={[1, 2, 3]} simple />);
    expect(wrapper.find('SimpleTrigger').length).toBe(1);
  });

  test('Select options', () => {
    const wrapper = mount(<Select data={[1, 2, 3]} />);
    wrapper.find('SelectTrigger').simulate('click');
    const pop = new ReactWrapper(wrapper.instance().popup, true);
    pop
      .find('Option')
      .at(1)
      .simulate('click');
    expect(wrapper.state('selectedItem').value).toBe(2);
  });

  test('Keyword Search', () => {
    const onEmptyMock = jest.fn();
    const asyncMock = jest.fn().mockImplementation((keyword, callback) => {
      setTimeout(() => {
        callback([2]);
      }, 1000);
    });
    const wrapper = mount(
      <Select
        data={[1, 2, 3]}
        search
        onAsyncFilter={asyncMock}
        onEmptySelected={onEmptyMock}
        filter={(item, keyword) => {
          return `${item.value}` === `${keyword}`;
        }}
      />,
    );
    expect(wrapper.find('InputTrigger').length).toBe(1);
    wrapper.find('InputTrigger').simulate('click');
    wrapper.find('input').simulate('change', {
      target: {
        value: 4,
      },
    });
    const pop = new ReactWrapper(wrapper.instance().popup, true);
    pop.find('Option').simulate('click');
    expect(onEmptyMock.mock.calls.length).toBe(1);
    wrapper.find('input').simulate('change', {
      target: {
        value: 3,
      },
    });
    expect(pop.find('Option').length).toBe(3);
    pop.find('Popup').simulate('keydown', { keyCode: 27 });
    expect(pop.find('Option').length).toBe(3);
  });

  it('Popup中的Search(filter and onAsyncFilter)', () => {
    let wrapper = mount(
      <Select
        data={['Option 1', 'Option 2', 'Option 3']}
        filter={(item, keyword) =>
          keyword &&
          item.value
            .trim()
            .toLowerCase()
            .indexOf(keyword.trim().toLowerCase()) > -1}
        searchPlaceholder="search"
      />,
    );
    wrapper.find('SelectTrigger').simulate('click');
    let pop = new ReactWrapper(wrapper.instance().popup, true);
    expect(pop.find('Option').length).toBe(3);
    pop
      .find('Search')
      .find('input')
      .simulate('change', {
        target: {
          value: '1',
        },
      });
    expect(pop.find('Option').length).toBe(1);

    const asyncMock = jest.fn().mockImplementation(() => {
      wrapper.setProps({
        data: ['Option 3'],
      });
    });

    // BUG: Provide asyncFilter only could not render Search
    wrapper = mount(
      <Select
        data={['Option 1', 'Option 2', 'Option 3']}
        onAsyncFilter={asyncMock}
        searchPlaceholder="search"
        filter={() => true}
      />,
    );
    jest.useFakeTimers();
    wrapper.find('SelectTrigger').simulate('click');
    pop = new ReactWrapper(wrapper.instance().popup, true);
    expect(pop.find('Option').length).toBe(3);
    pop
      .find('Search')
      .find('input')
      .simulate('change', {
        target: {
          value: 'anything',
        },
      });
    expect(pop.find('Option').length).toBe(1);
    expect(pop.find('Option').prop('value')).toBe('Option 3');
  });

  test('multi-label', () => {
    const wrapper = mount(<Select data={['1', '2', '3', '']} tags />);
    expect(wrapper.find('TagsTrigger').length).toBe(1);

    wrapper.find('TagsTrigger').simulate('click');
    const pop = new ReactWrapper(wrapper.instance().popup, true);
    pop
      .find('Option')
      .at(1)
      .simulate('click');
    wrapper.find('TagsTrigger').simulate('click');
    pop
      .find('Option')
      .at(2)
      .simulate('click');
    expect(wrapper.state('selectedItems').length).toBe(2);

    wrapper
      .find('Tag')
      .at(0)
      .find('i')
      .simulate('click');
    expect(wrapper.state('selectedItems').length).toBe(1);

    wrapper.find('TagsTrigger').simulate('click');
    pop
      .find('Option')
      .at(2)
      .simulate('click');
    expect(wrapper.state('selectedItems').length).toBe(1);

    // HACK: branch
    wrapper.find('TagsTrigger').simulate('click');
    pop
      .find('Option')
      .at(3)
      .simulate('click');
  });

  it('Popup button event', () => {
    const onChangeMock = jest.fn().mockImplementation(evt => {
      evt.preventDefault();
      evt.stopPropagation();
    });
    const onEmptyMock = jest.fn();
    const wrapper = mount(
      <Select
        data={['1', '2', '3', '']}
        tags
        onChange={onChangeMock}
        onEmptySelected={onEmptyMock}
      />,
    );
    expect(wrapper.find('TagsTrigger').length).toBe(1);
    wrapper.find('TagsTrigger').simulate('click');
    const pop = new ReactWrapper(wrapper.instance().popup, true);
    wrapper.find('.boldrui-select').simulate('keydown', { keyCode: 27 });
    wrapper.find('TagsTrigger').simulate('click');
    expect(pop.find('.current').length).toBe(1);
    pop.find('Popup').simulate('keydown', { keyCode: 41 });
    pop.find('Popup').simulate('keydown', { keyCode: 40 });
    expect(pop.find('.current').length).toBe(1);
    expect(pop.find('.current').prop('value')).toBe('2');
    pop.find('Popup').simulate('keydown', { keyCode: 40 });
    pop.find('Popup').simulate('keydown', { keyCode: 40 });
    expect(pop.find('.current').prop('value')).toBe('');
    pop.find('Popup').simulate('keydown', { keyCode: 40 });
    pop.find('Popup').simulate('keydown', { keyCode: 40 });
    pop.find('Popup').simulate('keydown', { keyCode: 40 });
    expect(pop.find('.current').prop('value')).toBe('3');
    pop.find('Popup').simulate('keydown', { keyCode: 38 });
    pop.find('Popup').simulate('keydown', { keyCode: 38 });
    expect(pop.find('.current').prop('value')).toBe('1');
    pop.find('Popup').simulate('keydown', { keyCode: 38 });
    pop.find('Popup').simulate('keydown', { keyCode: 38 });
    pop.find('Popup').simulate('keydown', { keyCode: 38 });
    pop.find('Popup').simulate('keydown', { keyCode: 38 });
    pop.find('Popup').simulate('keydown', { keyCode: 38 });
    pop.find('Popup').simulate('keydown', { keyCode: 38 });
    expect(pop.find('.current').prop('value')).toBe('3');
    expect(onChangeMock.mock.calls.length).toBe(0);
    pop.find('Popup').simulate('keydown', { keyCode: 13 });
    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(onChangeMock.mock.calls[0][0].target.value).toBe('3');
    expect(onChangeMock.mock.calls[0][0].target.type).toBe('select-multiple');
    expect(onChangeMock.mock.calls[0][1].value).toBe('3');
    wrapper.find('TagsTrigger').simulate('click');
    expect(pop.find('.current').length).toBe(1);
    pop.find('Popup').simulate('keydown', { keyCode: 40 });
    pop.find('Popup').simulate('keydown', { keyCode: 40 });
    pop.find('Popup').simulate('keydown', { keyCode: 40 });
    pop.find('Popup').simulate('keydown', { keyCode: 40 });
    pop.find('Popup').simulate('keydown', { keyCode: 40 });
    pop.find('Popup').simulate('keydown', { keyCode: 13 });
    expect(onEmptyMock.mock.calls.length).toBe(0);
  });

  it('Dynamic Select', () => {
    const data = [1, 2, 3];
    const updatedData = [1, 2, 3, 4];
    const wrapper = mount(<Select data={data} />);
    wrapper.find('SelectTrigger').simulate('click');
    const pop = new ReactWrapper(wrapper.instance().popup, true);
    pop
      .find('Option')
      .at(1)
      .simulate('click');

    // HACK: branch Select.js line 89
    wrapper.setProps({ data });
    wrapper.setProps({ data, value: [] });
    wrapper.setProps({ data: updatedData, value: [], index: '' });

    wrapper.setProps({ data: updatedData });
    wrapper.setProps({ data, value: [2] });
    expect(wrapper.state('selectedItems')[0].value).toBe(2);

    // BUG: hard to reach Select.js line 129
    // wrapper.setProps({ data: [{ key: 1 }, { key: 2 }], value: { key: 1 } });
    wrapper.setProps({ data: updatedData, value: 2 });
    expect(wrapper.state('selectedItem').value).toBe(2);
  });
});
