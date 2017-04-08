import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import DashNav from '../src/components/DashNav/DashNav';
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

const { SubMenu } = DashNav;
const MenuItemGroup = DashNav.ItemGroup;

class Sink extends Component {
  handleClick = e => {
    console.log('click ', e);
  };
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
        <Topbar style={{ height: '55px'}}/>
      <div className="boldrui-dashboard-body">
        <DashNav
          onClick={ this.handleClick }
          style={ { width: 240 } }
          defaultSelectedKeys={ ['1'] }
          defaultOpenKeys={ ['sub1'] }
          mode="inline"
        >
          <SubMenu key="sub1" title={ <span>Navigation Two</span> }>
            <MenuItemGroup key="g1" title="Item 1">
              <DashNav.Item key="1"><Link to="/">Option 1</Link></DashNav.Item>
              <DashNav.Item key="2">Option 2</DashNav.Item>
            </MenuItemGroup>
            <MenuItemGroup key="g2" title="Item 2">
              <DashNav.Item key="3">Option 3</DashNav.Item>
              <DashNav.Item key="4">Option 4</DashNav.Item>
            </MenuItemGroup>
          </SubMenu>
          <SubMenu key="sub2" title={ <span>Navigation Two</span> }>
            <DashNav.Item key="5">Option 5</DashNav.Item>
            <DashNav.Item key="6">Option 6</DashNav.Item>
            <SubMenu key="sub3" title="Submenu">
              <DashNav.Item key="7">Option 7</DashNav.Item>
              <DashNav.Item key="8">Option 8</DashNav.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub4" title={ <span>Navigation Two</span> }>
            <DashNav.Item key="9">Option 9</DashNav.Item>
            <DashNav.Item key="10">Option 10</DashNav.Item>
            <DashNav.Item key="11">Option 11</DashNav.Item>
            <DashNav.Item key="12">Option 12</DashNav.Item>
          </SubMenu>
        </DashNav>
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
