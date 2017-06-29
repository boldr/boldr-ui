/* @flow */
import React from 'react';
import styled from 'styled-components';
import cxN from 'classnames';
import NavbarMenu from './NavbarMenu';
import NavbarBrand from './NavbarBrand';

export type Props = {
  isFixed: boolean,
};

class Navbar extends React.Component {
  static defaultProps = {
    isFixed: true,
  };
  /**
     * Check if link is active
     *
     * @param {object} link - An object describing the link
     * @param {string} url - The URL to test against
     * @return {bool} - Whether or not the given link is active
     */
  _isActive = (link = {}, url = '') => {
    let urlToTest = link.url || '';

    if (urlToTest.length > 1) {
      urlToTest = urlToTest.replace(/^\//, '');
    }

    if (url.length > 1) {
      return url.endsWith(urlToTest) || url.includes(`${urlToTest}/`);
    } else if (url === '/') {
      return urlToTest === '/' || urlToTest === '';
    } else {
      return false;
    }
  };

  props: Props;
  render() {
    const { isFixed } = this.props;
    const navbarClassName = cxN({
      'boldrui-navbar-fixed': isFixed,
      'boldrui-navbar-static': !isFixed,
    });
    return (
      <header id="boldrui-navbar" className={navbarClassName}>
        <input
          type="checkbox"
          id="boldrui-navbar-checkbox"
          className="boldrui-navbar-checkbox"
          value="on"
        />
        <NavbarMenu />
      </header>
    );
  }
}

export default Navbar;
