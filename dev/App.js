import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import '../src/styles/boldrui.scss';

import { Grid, Sidebar, Anchor, SidebarNav, DashboardWrapper, DashboardFooter, DashboardContent, Topbar } from '../src/components';
import menuItems from './items';
import Posts from './Posts';

class App extends Component {
  state = {
    hidden: false,
    activate: null,
  };

  toggleSidebar = e => {
    this.setState({
      hidden: !this.state.hidden,
    });
  };
  clickActivate = () => {
    const activate = '/item41/a';

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
        {!this.state.hidden ?
        <Sidebar
          items={ menuItems }
          activeItem={ this.state.activate }
          logoImg="https://boldr.io/logo.png"
          logoLink="/"
          isPrimaryColor
        />
        : null}
        <DashboardWrapper>
          <Topbar toggleSidebar={ this.toggleSidebar } />
          <DashboardContent>
            <Grid fluid>
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

export default App;
