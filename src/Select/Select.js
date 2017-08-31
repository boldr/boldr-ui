/**
 * Select
 */

import React, { Component, Children } from 'react';
import assign from 'lodash.assign';
import omit from 'lodash.omit';
import cloneDeep from 'lodash.clonedeep';
import isEqual from 'lodash.isequal';
import noop from 'lodash.noop';
import PropTypes from 'prop-types';

import Popover from '../Popover';
import Trigger from './triggers/Index';
import Popup from './Popup';
import SimpleTrigger from './triggers/SimpleTrigger';
import SelectTrigger from './triggers/SelectTrigger';
import InputTrigger from './triggers/InputTrigger';
import TagsTrigger from './triggers/TagsTrigger';

class PopoverClickTrigger extends Popover.Trigger.Click {
  getTriggerProps(child) {
    return {
      onClick: evt => {
        evt.preventDefault();
        if (this.props.contentVisible) {
          this.props.close();
        } else if (!child.props.disabled) {
          this.props.open();
          this.triggerEvent(child, 'onClick', evt);
        }
      },
    };
  }
}

class Select extends Component {
  constructor(props) {
    super(props);

    if (props.simple) {
      this.trigger = SimpleTrigger;
    } else if (props.search) {
      this.trigger = InputTrigger;
    } else if (props.tags) {
      this.trigger = TagsTrigger;
    } else {
      this.trigger = props.trigger;
    }

    this.state = assign(
      {
        selectedItems: [],
        selectedItem: {
          value: '',
          text: '',
        },
      },
      props,
    );
  }

  componentWillMount() {
    /**
       * Data support string array and object array two modes
       *
       * String array default value is subscript
       * The object array needs to provide value and text
       *
       * @return {object}
       */
    const data = this.uniformData(this.props);
    this.formateData(data);
  }

  componentWillReceiveProps(nextProps) {
    const data = this.uniformData(nextProps);
    this.formateData(data, nextProps);
  }

  // Unify the data in the children and data
  uniformData(props) {
    let data = [];
    if (props.children) {
      data = Children.map(props.children, item => {
        let value = item.props.value;
        value = typeof value === 'undefined' ? item : value;
        return assign({}, item.props, {
          value,
          text: item.props.children,
        });
      });
    }

    // props.data overwrites the child element
    if (props.data) {
      data = props.data;
    }
    return data;
  }

  // Displays the current option, which supports external control via value and index
  getOptions(state, props, item, i) {
    const { value, index } = props;
    if (Array.isArray(value) && value.indexOf(item.value) > -1) {
      // rerender
      if (!state.sItems.find(selected => selected.value === item.value)) {
        state.sItems.push(item);
      }
    } else if (Array.isArray(value) && value.length === 0) {
      // multiple choice reset
      state.sItem = {};
      state.sItems = [];
    } else if (typeof value === 'object' && isEqual(value, item.value)) {
      state.sItem = item;
    } else if (
      (typeof value !== 'undefined' &&
        typeof value !== 'object' &&
        `${item.value}` === `${value}`) ||
      (index !== 'undefined' && `${i}` === `${index}`)
    ) {
      state.sItem = item;
    } else if (!value && !index) {
      // reset
      state.sItem = {};
      state.sItems = [];
    }
    return state;
  }

  // Data processing, increase cid
  formateData(data, props) {
    data = data || this.sourceData;
    props = props || this.props;
    const that = this;
    const { selectedItem, selectedItems } = this.state;
    const { value, index, initialIndex, initialValue, optionValue, optionText } = props;
    const selected = { sItem: selectedItem, sItems: [] };

    this.sourceData = cloneDeep(data)
      .map(item => {
        let result = {};
        if (typeof item === 'object') {
          result.value = item[optionValue];
          result.text = item[optionText];
          result = { ...item, ...result };
        } else {
          result.value = item;
          result.text = item;
        }
        return result;
      })
      .map((item, i) => {
        item.cid = `${i}`;

        // handle the default options (initialIndex, initialValue)
        if (
          selectedItems.length === 0 &&
          !selectedItem.cid &&
          (initialValue !== null || initialIndex !== null)
        ) {
          that.getOptions(selected, { value: initialValue, index: initialIndex }, item, i);
        }

        // with controlled logic (index, value)
        if (value !== null || index !== null) {
          that.getOptions(selected, { value, index }, item, i);
        }
        return item;
      });
    this.setState({
      selectedItem: selected.sItem,
      selectedItems: selected.sItems,
    });
    return this.sourceData;
  }

  // receive the trigger to change the data, the data passed to the popup
  triggerChangeHandler = data => {
    this.setState(data);
  };

  triggerDeleteHandler = data => {
    let { selectedItems } = this.state;
    selectedItems = selectedItems.filter(item => item.cid !== data.cid);
    this.setState(
      {
        selectedItems,
      },
      () => {
        this.props.onDelete(data);
      },
    );
  };

  // pass the selected option's data to the trigger
  optionChangedHandler = (ev, selectedItem) => {
    const result = {};
    ev = ev || {
      preventDefault: noop,
      stopPropagation: noop,
    };
    const { onEmptySelected, optionValue, optionText, tags, onChange } = this.props;
    const { selectedItems } = this.state;
    if (!selectedItem) {
      onEmptySelected(ev);
      return;
    }
    const args = omit(selectedItem, ['cid']);
    result[optionValue] = selectedItem.value;
    result[optionText] = selectedItem.text;
    const data = { ...args, ...result };
    if (tags) {
      if (!selectedItems.some(item => item.cid === selectedItem.cid)) {
        selectedItems.push(selectedItem);
      }
    }
    this.setState(
      {
        keyword: null,
        selectedItems,
        selectedItem,
      },
      () => {
        onChange(
          {
            target: {
              ...this.props,
              type: tags ? 'select-multiple' : 'select-one',
              value: selectedItem.value,
            },

            preventDefault() {
              ev.preventDefault();
            },

            stopPropagation() {
              ev.stopPropagation();
            },
          },
          data,
        );
      },
    );
  };

  handlePopoverVisibleChange = visible => {
    if (visible) {
      this.props.onOpen();
    }
    this.setState({ open: visible });
  };

  render() {
    const {
      placeholder,
      maxToShow,
      className,
      popupClassName,
      disabled,
      emptyText,
      filter = this.props.onFilter,
      onAsyncFilter,
      searchPlaceholder,
    } = this.props;

    const { open, selectedItems, selectedItem = {}, extraFilter, keyword = null } = this.state;

    const { cid = '' } = selectedItem;

    const disabledCls = disabled ? 'disabled' : '';
    const prefixCls = `${this.props.prefix}-select`;
    return (
      <Popover
        display="inline-block"
        position={Popover.Position.AutoBottomLeft}
        visible={open}
        className={`${prefixCls} ${popupClassName}`}
        wrapperClassName={`${prefixCls} ${className} ${disabledCls}`}
        onVisibleChange={this.handlePopoverVisibleChange}
      >
        <PopoverClickTrigger>
          <Trigger
            disabled={disabled}
            prefixCls={prefixCls}
            trigger={this.trigger}
            placeholder={placeholder}
            selectedItems={selectedItems}
            keyword={keyword}
            {...selectedItem}
            onChange={this.triggerChangeHandler}
            onDelete={this.triggerDeleteHandler}
          />
        </PopoverClickTrigger>
        <Popover.Content>
          <Popup
            ref={ref => (this.popup = ref)}
            cid={cid}
            prefixCls={prefixCls}
            data={this.sourceData}
            selectedItems={selectedItems}
            extraFilter={extraFilter}
            searchPlaceholder={searchPlaceholder}
            emptyText={emptyText}
            keyword={keyword}
            filter={filter}
            onAsyncFilter={onAsyncFilter}
            maxToShow={maxToShow}
            onChange={this.optionChangedHandler}
            onFocus={this.popupFocusHandler}
            onBlur={this.popupBlurHandler}
          />
        </Popover.Content>
      </Popover>
    );
  }
}

Select.propTypes = {
  data: PropTypes.array,
  prefix: PropTypes.string,
  className: PropTypes.string,
  open: PropTypes.bool,
  popupClassName: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  maxToShow: PropTypes.number,
  searchPlaceholder: PropTypes.string,
  emptyText: PropTypes.string,
  selectedItem: PropTypes.shape({
    value: PropTypes.any,
    text: PropTypes.string,
  }),
  trigger: PropTypes.func,
  optionValue: PropTypes.string,
  optionText: PropTypes.string,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
  filter: PropTypes.func,
  onAsyncFilter: PropTypes.func,
  onEmptySelected: PropTypes.func,
  onOpen: PropTypes.func,
};

Select.defaultProps = {
  prefix: 'boldr',
  disabled: false,
  className: '',
  open: false,
  popupClassName: '',
  trigger: SelectTrigger,
  placeholder: 'Choose option',
  searchPlaceholder: '',
  emptyText: 'No match found',
  selectedItem: {
    value: '',
    text: '',
  },
  selectedItems: [],
  optionValue: 'value',
  optionText: 'text',

  // HACK
  value: null,
  index: null,
  initialValue: null,
  initialIndex: null,

  onChange: noop,
  onDelete: noop,
  onEmptySelected: noop,
  onOpen: noop,
};

export default Select;
