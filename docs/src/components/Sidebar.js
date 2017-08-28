import React from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';

import {
  withRR4,
  Nav,
  NavText,
  NavIcon,
  SideNavHeader,
  SideNavWrapper,
  SeparatorTitle,
  Button,
  Headline,
  Tooltip,
  Grid,
  Tag,
  Col,
  Icon,
  Row,
  ImageDisplay,
  Paper,
  Topbar,
  TopbarLink,
} from 'boldr-ui';

import IconDemo from '../components/IconDemo';

const style = {
  display: 'inline-block',
  padding: '0 25px 25px',
};
const SideNav = withRR4();

function Sidebar(props) {
  return (
    <SideNavWrapper>
      <SideNavHeader>
        <img src="https://boldr.io/assets/boldr-blue-logo.png" height="40px" />
      </SideNavHeader>
      <SideNav
        default="dashboard"
        hoverBgColor="#2f4256"
        hoverColor="#c8f0ff"
        highlightBgColor="#2f4256"
        selected="customers/sales2"
        highlightColor="#FFF"
      >
        <Nav id="dashboard">
          <NavIcon>
            <Icon kind="embedded" color="#fff" size="20" />
          </NavIcon>
          <NavText> Dashboard </NavText>
        </Nav>

        <Nav id="products">
          <NavIcon>
            <Icon kind="activity" color="#fff" size="20" />
          </NavIcon>
          <NavText> Products </NavText>
        </Nav>
        <Nav id="orders">
          <NavIcon>
            <Icon kind="folder-upload" color="#fff" size="20" />
          </NavIcon>
          <NavText>Orders</NavText>
        </Nav>

        <Nav id="customers">
          <NavIcon>
            <Icon kind="dashboard" color="#fff" size="20" />
          </NavIcon>
          <NavText> Customers </NavText>
          <Nav id="dashboard2">
            <NavIcon>
              <Icon kind="routes" color="#fff" size="20" />
            </NavIcon>
            <NavText> Search </NavText>
          </Nav>
          <Nav
            id="sales2"
            onNavClick={() => {
              console.log('Promote clicked!', arguments);
            }}
          >
            <NavIcon>
              <Icon kind="bold" color="#fff" size="16" />
            </NavIcon>
            <NavText> Promote </NavText>
          </Nav>
          <Nav id="products2">
            <NavIcon>
              <Icon kind="bold" color="#fff" size="16" />
            </NavIcon>
            <NavText> Social Media </NavText>
          </Nav>
        </Nav>
        <Nav
          id="sales"
          onNavClick={() => {
            console.log('Sales clicked!', arguments);
          }}
        >
          <NavIcon>
            <Icon kind="bold" color="#fff" size="16" />
          </NavIcon>
          <NavText> Sales </NavText>
        </Nav>
        <Nav id="deliveries">
          <NavIcon>
            <Icon kind="bold" color="#fff" size="16" />
          </NavIcon>
          <NavText> Deliveries </NavText>
        </Nav>
      </SideNav>
    </SideNavWrapper>
  );
}

Sidebar.propTypes = {
  classes: PropTypes.object,
};

export default Sidebar;
