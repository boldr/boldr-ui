/* @flow */

import React, { Component } from 'react';
import isArray from 'lodash/isArray';

import Search from './components/Search';
import Option from './components/Option';
import { KEY_EN, KEY_UP, KEY_DOWN } from './constants';

export type Props = {
  cid?: string,
  keyword?: any,
  selectedItems?: Array<any>,
  searchPlaceholder?: string,
  emptyText?: any,
  prefixCls?: string,
  extraFilter?: boolean,
  filter?: Function,
  onAsyncFilter?: Function,
  onFocus?: Function,
  onBlur?: Function,
};

class Popup extends Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      data: props.data,
      currentId: 0,
      keyword: props.keyword || '',
    };
    this.currentId = 0;
    this.sourceData = props.data;
    this.searchFilterHandler = this.searchFilterHandler.bind(this);
    this.optionChangedHandler = this.optionChangedHandler.bind(this);
    this.keydownHandler = this.keydownHandler.bind(this);
  }

  props: Props;

  componentDidMount() {
    if (!this.props.filter) {
      this.popup.focus();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.sourceData = nextProps.data;
    if (nextProps.keyword !== null) {
      this.setState({
        data: nextProps.data,
        keyword: nextProps.keyword,
      });
    }
  }

  optionChangedHandler(ev, cid) {
    this.setState({
      keyword: '',
    });
    this.props.onBlur();
    this.props.onChange(ev, this.props.data.filter(item => item.cid === cid)[0]);
  }

  searchFilterHandler(keyword) {
    let { filter, onAsyncFilter } = this.props;

    if (typeof onAsyncFilter === 'function') {
      onAsyncFilter(`${keyword}`, data => {
        this.setState({
          keyword,
          data: this.sourceData.filter(item => isArray(data) && data.indexOf(item.value) > -1),
        });
      });
    } else {
      this.setState({
        keyword,
        data: this.sourceData.filter(item => !keyword || !filter || filter(item, `${keyword}`)),
      });
    }
  }

  keydownHandler(ev) {
    let code = ev.keyCode;
    let itemIds = this.itemIds;
    let { currentId, keyword } = this.state;
    let index = itemIds.indexOf(currentId);
    switch (code) {
      case KEY_DOWN:
        ev.preventDefault();
        if (this.itemIds[index + 1]) {
          currentId = this.itemIds[index + 1];
          this.currentIdUpdated = true;
        }
        break;
      case KEY_UP:
        ev.preventDefault();
        if (index > 0) {
          currentId = this.itemIds[index - 1];
          this.currentIdUpdated = true;
        }
        break;
      case KEY_EN:
        ev.preventDefault();
        this.optionChangedHandler(keyword, currentId);
        this.currentIdUpdated = false;
        break;
      default:
        break;
    }
    this.setState({
      currentId,
    });
  }

  updateCurrentId(cid) {
    this.setState({
      currentId: cid,
    });
  }

  render() {
    let {
      cid,
      selectedItems,
      emptyText,
      prefixCls,
      extraFilter,
      searchPlaceholder,
      filter,
      onFocus,
      onBlur,
    } = this.props;

    let { keyword, data, currentId } = this.state;

    let filterData = data.filter(item => {
      return !keyword || !filter || filter(item, `${keyword}`);
    });
    let showEmpty = data.length === 0 || filterData.length === 0;

    this.itemIds = filterData.map(item => item.cid);

    return (
      <div
        ref={popup => (this.popup = popup)}
        tabIndex="0"
        className={`${prefixCls}-popup`}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={this.keydownHandler}
      >
        {!extraFilter && filter
          ? <Search
              keyword={keyword}
              prefixCls={prefixCls}
              placeholder={searchPlaceholder}
              onChange={this.searchFilterHandler}
            />
          : ''}
        {filterData.map((item, index) => {
          if (index === 0 && !currentId) {
            currentId = item.cid;
            this.state.currentId = currentId;
          }
          if (keyword && item.text === keyword) {
            currentId = item.cid;
          }
          let currentCls = item.cid === currentId ? 'current' : '';
          let activeCls = selectedItems.filter(o => o.cid === item.cid).length > 0 ||
            item.cid === cid
            ? 'active'
            : '';
          return (
            <Option
              key={index}
              className={`${prefixCls}-option ${activeCls} ${currentCls}`}
              {...item}
              onClick={this.optionChangedHandler}
              onMouseEnter={this.updateCurrentId.bind(this, item.cid)}
            />
          );
        })}
        {showEmpty &&
          <Option
            className={`${prefixCls}-empty`}
            text={emptyText}
            onClick={this.optionChangedHandler}
          />}
      </div>
    );
  }
}

Popup.defaultProps = {
  cid: -1,
  keyword: '',
  selectedItems: [],
  emptyText: '',
  prefixCls: '',
  extraFilter: false,
  searchPlaceholder: '',
};

export default Popup;
