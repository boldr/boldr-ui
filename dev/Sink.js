import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import '../src/styles/boldrui.scss';

import {
  Grid,
  Paper,
  Loader,
  Col,
  Row,
  Footer,
  Heading,
  FormGroup,
  StatsWidget,
  Topbar,
  Sidebar,
  SidebarLink,
  SidebarTitle,
} from '../src/components';

class Sink extends Component {
  render() {
    const testStats = {
      posts: 3,
      users: 4,
      tags: 3,
      dogs: 9,
      cats: 0,
    };
    const meOb = {
      avatarUrl: 'https://boldr.io/images/unknown-avatar.png',
      firstName: 'Me',
      username: 'someone',
    };
    return (
      <div className="boldrui-dashboard">
        <Topbar me={ meOb } />
        <div className="boldrui-dashboard-body">
          <Sidebar { ...this.props }>
            <SidebarTitle text="Hi" />
            <SidebarLink href="/" icon="plus" text="test" />
          </Sidebar>
          <main className="main">
            <Grid fluid>
              <Row>
                <Col md={ 12 }>
                  <Paper zDepth={ 3 }>
                    <Heading size={ 1 }>Hi, Heading</Heading>
                    <FormGroup paddingTop="20px" paddingBottom="25px">Hi</FormGroup>
                  </Paper>

                  <StatsWidget stats={ testStats } />
                </Col>
              </Row>
              <Loader />
            </Grid>
          </main>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Sink;
