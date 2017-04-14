import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import '../src/styles/boldrui.scss';

import {
  Grid,
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
               <button onClick={() => { this.clickActivate(); }}>Click to activate the item with the link &quot;/item41/a&quot;</button>
              <Route exact path="/" render={ this.renderMain } />
              <Route path="/posts" render={ this.renderPosts } />
            </Grid>
          </DashboardContent>
          <DashboardFooter copyright="© 2017 Steven Truesdell" />
        </DashboardWrapper>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    routing: state.routing,
  };
};

export default connect(mapStateToProps)(App);
