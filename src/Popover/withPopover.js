import React, { Component } from 'react';
import omit from 'lodash.omit';

import { PopoverContextType } from './Popover';

export const exposePopover = propName => Base => {
  return class ExposePopover extends Component {
    static contextTypes = PopoverContextType;

    render() {
      const { _boldruiPopover: popover } = this.context || {};
      const context = {
        [propName]: omit(popover, ['registerDescendant', 'unregisterDescendant']),
      };

      return <Base {...this.props} {...context} />;
    }
  };
};

export default exposePopover('popover');
