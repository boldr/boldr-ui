import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import SvgIcon from 'react-icons-kit';
import { ic_aspect_ratio } from 'react-icons-kit/md/ic_aspect_ratio';
import { ic_business } from 'react-icons-kit/md/ic_business';
import { ic_business_center } from 'react-icons-kit/md/ic_business_center';
import {
  ic_format_list_bulleted,
} from 'react-icons-kit/md/ic_format_list_bulleted';
import { ic_people } from 'react-icons-kit/md/ic_people';
import { ic_shopping_cart } from 'react-icons-kit/md/ic_shopping_cart';
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
  withRR4,
  Nav,
  NavText,
  NavIcon,
} from '../src/components';

const SideNav = withRR4();

class Sales extends React.Component {
  componentWillUnmount() {
    console.log('Sales Will Unmount');
  }

  render() {
    return <div>Sales</div>;
  }
}

const Title = styled.div`
    padding: 12px;
`;

const Separator = styled.div`
    padding-right: 12px;
`;
const SeparatorTitleContainer = styled.div`
    font-size: 14px;
    color: #AAA;
    margin: 10px 12px;
    padding: 4px 12px 2px;
`;
const SeparatorTitle = props => {
  return (
    <SeparatorTitleContainer>
      {props.children}
      <hr
        style={ {
          border: 0,
          borderTop: '1px solid #E5E5E5',
        } }
      />
    </SeparatorTitleContainer>
  );
};

const BaseContainer = props => (
  <div
    style={ {
      display: 'inline-block',
      paddingTop: 16,
      paddingBottom: 16,
      fontFamily: 'Roboto',
      width: 240,
      ...props.style,
    } }
  >
    {props.children}
  </div>
);

const Icon20 = props => <SvgIcon size={ props.size || 20 } icon={ props.icon } />;

const NavMain = {
  dashboard: {
    title: 'Dashboard',
    icon: ic_aspect_ratio,
  },
  products: {
    title: 'Products',
    icon: ic_business_center,
  },
  orders: {
    title: 'Orders',
    icon: ic_format_list_bulleted,
  },
};

class Root extends Component {
  renderDashboad = () => {
    return <div>Dashboard</div>;
  };

  renderSales = () => {
    return <Sales />;
  };

  renderProducts = () => {
    return <div>Products</div>;
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
      <Router>
        <div
          style={ {
            display: 'flex',
            flexDirection: 'row',
          } }
        >
          <BaseContainer
            style={ { background: '#2c3e50',
              color: '#FFF' } }
          >
            <SideNav highlightBgColor="#00bcd4" defaultSelected="sales">
              <Title> Basic SideNav </Title>
              <Nav id="dashboard">
                <NavIcon><Icon20 icon={ ic_aspect_ratio } /></NavIcon>
                <NavText> Dashboard </NavText>
              </Nav>
              <Nav id="sales">
                <NavIcon><Icon20 icon={ ic_business } /></NavIcon>
                <NavText> Sales </NavText>
              </Nav>
              <Nav id="products">
                <NavIcon><Icon20 icon={ ic_business_center } /></NavIcon>
                <NavText> Products </NavText>
              </Nav>
              <Nav id="customers">
                <NavIcon><Icon20 icon={ ic_people } /></NavIcon>
                <NavText> Customers </NavText>
                <Nav id="dashboard2">
                  <NavIcon><Icon20 size={ 16 } icon={ ic_aspect_ratio } /></NavIcon>
                  <NavText> Search </NavText>
                </Nav>
                <Nav id="sales2">
                  <NavIcon><Icon20 size={ 16 } icon={ ic_business } /></NavIcon>
                  <NavText> Promote </NavText>
                </Nav>
                <Nav id="products2">
                  <NavIcon>
                    <Icon20 size={ 16 } icon={ ic_business_center } />
                  </NavIcon>
                  <NavText> Social Media </NavText>
                </Nav>
              </Nav>
              <Nav id="orders">
                <NavIcon><Icon20 icon={ ic_format_list_bulleted } /></NavIcon>
                <NavText> Orders </NavText>
              </Nav>
            </SideNav>
          </BaseContainer>
          <div style={ { padding: 20 } }>
            <Route exact path="/" render={ this.renderDashboad } />
            <Route path="/sales" render={ this.renderSales } />
            <Route path="/products" render={ this.renderProducts } />
          </div>
        </div>
      </Router>
    );
  }
}

export default Root;
