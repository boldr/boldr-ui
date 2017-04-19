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
  Link,
  Topbar,
} from '../src/components';
import TopbarLink from '../src/components/Topbar/TopbarLink';
import menuItems from './items';
import Posts from './Posts';
import Button from 'react-md/lib/Buttons';

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
      <ThemeProvider theme={theme}>
        <div
          style={{
            display: 'flex',
            height: '100%',
            minHeight: '100%',
          }}
        >
          {this.props.ui.visible
            ? <Sidebar
                items={menuItems}
                activeItem={this.props.routing.location.pathname}
                location={this.props.routing.location.pathname}
                onExpandCollapse={this.onExpandCollapse}
                onVisibilityChange={this.handleSidebarClick}
                visible={this.props.ui.visible}
                expanded={this.props.ui.expanded}
                logoImg="https://boldr.io/assets/boldr-white-logo.png"
                logoLink="/"
                isPrimaryColor
              />
            : null}
          <DashboardWrapper>
            <Topbar
               url={ window.location.pathname }
              onMenuClick={this.handleSidebarClick}
              link={ TopbarLink }
              links={[
                { title: 'Example Link', url: '/example' },
                { title: 'Another', url: '/another' },
                {
                  title: 'Link w/ Children',
                  url: '/children',
                },
              ]}
            />
            <DashboardContent>
              <Grid fluid>
                <Row>
                  <Col xs={6} md={3}>Hello, world!</Col>
                </Row>
                <Heading size={1}> HEY</Heading>
                <Button secondary raised label="button" /><Button primary raised label="button" />
                <Row>
                  <Col xs={6} md={3}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Col>
                </Row>
                <Row>
                  <Col xs={6} md={3}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Col>
                </Row>
                <Row>
                  <Col xs={6} md={3}>Hello, world!</Col>
                </Row>
                <Row>
                  <Col xs={6} md={3}>Hello, world!</Col>
                </Row>
                <Row>
                  <Col xs={6} md={3}>Hello, world!</Col>
                  <Photo src="https://boldr.io/logo.png" cta="phtoo" />
                </Row>

                <Route exact path="/" render={this.renderMain} />
                <Route path="/posts" render={this.renderPosts} />
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
