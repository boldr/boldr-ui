/* eslint-env jest */
import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { shallow, mount } from 'enzyme';
import Tabs from './Tabs';

const { TabPane } = Tabs;
describe('Tabs', () => {
  describe('tabPosition', () => {
    it('remove card', () => {
      const wrapper = mount(
        <Tabs tabPosition="left" tabBarExtraContent="xxx">
          <TabPane tab="foo" key="1">
            foo
          </TabPane>
        </Tabs>,
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
