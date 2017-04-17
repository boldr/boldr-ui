/* eslint-disable react/prop-types, react/no-unescaped-entities */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { injectGlobal, ThemeProvider } from 'styled-components';

import '../src/styles/boldrui.scss';
import theme from '../src/theme/theme';
import Photo from '../src/components/Photo';
import Heading from '../src/components/Heading';
import { Grid, Col, Row } from '../src/components/Layout';

import {
  Sidebar,
  Anchor,
  SidebarNav,
  DashboardWrapper,
  DashboardFooter,
  DashboardContent,
  Topbar,
} from '../src/components';
import menuItems from './items';
import Posts from './Posts';

injectGlobal`
  body {
    margin: 0;
  }
`;
class App extends Component {
  state = {
    hidden: false,
    activate: null,
  };

  handleSidebarClick = e => {
    this.props.dispatch({ type: 'TOGGLE_SIDEBAR' });
  };

  onExpandCollapse = () => {
    this.props.dispatch({ type: 'TOGGLE_SB_MENU' });
  };

  clickActivate = () => {
    const activate = '/admin/posts';

    this.setState({ activate });
  };
  renderMain = () => {
    return <div>renderMain</div>;
  };
  renderPosts = () => <Posts />;

  render() {
    return (
      <ThemeProvider theme={ theme }>
        <div
          style={ {
            display: 'flex',
            height: '100%',
          } }
        >
          {this.props.ui.visible
            ? <Sidebar
              items={ menuItems }
              activeItem={ this.props.routing.location.pathname }
              location={ this.props.routing.location.pathname }
              onExpandCollapse={ this.onExpandCollapse }
              onVisibilityChange={ this.handleSidebarClick }
              visible={ this.props.ui.visible }
              expanded={ this.props.ui.expanded }
              logoImg="https://boldr.io/logo.png"
              logoLink="/"
              isPrimaryColor
            />
            : null}
          <DashboardWrapper>
            <Topbar toggleSidebar={ this.handleSidebarClick } />
            <DashboardContent>
              <Grid fluid>
                <Row>
                  <Col xs={ 6 } md={ 3 }>Hello, world!</Col>
                </Row>
                <Heading size={ 1 }> HEY</Heading>
                <Photo src="https://boldr.io/logo.png" cta="phtoo"/>
                <Route exact path="/" render={ this.renderMain } />
                <Route path="/posts" render={ this.renderPosts } />
              </Grid>
            </DashboardContent>
            <DashboardFooter copyright="© 2017 Steven Truesdell" />
          </DashboardWrapper>
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    ui: state.ui,
    routing: state.routing,
  };
};

export default connect(mapStateToProps)(App);
