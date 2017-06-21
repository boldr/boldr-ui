import React from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import {
  withRR4,
  Nav,
  NavText,
  NavIcon,
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
} from 'boldr-ui';
const style = {
  display: 'inline-block',
  padding: '0 25px 25px',
};
const SideNav = withRR4();

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
      <hr style={{ border: 0, borderTop: '1px solid #E5E5E5' }} />
    </SeparatorTitleContainer>
  );
};

const BaseContainer = props =>
  <div
    style={{
      display: 'inline-block',
      paddingTop: 16,
      paddingBottom: 16,
      fontFamily: 'Roboto',
      width: 240,
      ...props.style,
    }}
  >
    {props.children}
  </div>;
function Home(props) {
  const classes = props.classes;

  return (
    <div>
      <Grid fluid>
        <Row>
          <Col sm={3}>
            <BaseContainer style={{ background: '#143144', color: '#FFF' }}>
              <div style={{ display: 'flex', padding: 16 }}>
                <img src="https://boldr.io/assets/boldr-white-logo.png" height="40px" />
              </div>
              <SideNav
                default="dashboard"
                hoverBgColor="#00bcd4"
                hoverColor="#1c415a"
                highlightBgColor="#1c415a"
                selected="customers/sales2"
                highlightColor="#FFF"
              >
                <Nav id="dashboard">
                  <NavIcon><Icon kind="settings" color="#fff" size="20" /></NavIcon>
                  <NavText> Dashboard </NavText>
                </Nav>

                <Nav id="products">
                  <NavIcon><Icon kind="posts" color="#fff" size="20" /></NavIcon>
                  <NavText> Products </NavText>
                </Nav>
                <Nav id="orders">
                  <NavIcon><Icon kind="folder-upload" color="#fff" size="20" /></NavIcon>
                  <NavText>
                    {' '}<span style={{ paddingRight: 6 }}>Orders</span>{' '}
                    <span
                      style={{
                        textAlign: 'center',
                        lineHeight: '16px',
                        height: 16,
                        width: 16,
                        margin: '0 auto',
                        borderRadius: '50%',
                        fontSize: 9,
                        display: 'inline-block',
                        color: '#FFF',
                        background: '#ff5b57',
                      }}
                    >
                      10
                    </span>
                  </NavText>
                </Nav>

                <Nav id="customers">
                  <NavIcon><Icon kind="dashboard" color="#fff" size="20" /></NavIcon>
                  <NavText> Customers </NavText>
                  <Nav id="dashboard2">
                    <NavIcon><Icon kind="routes" color="#fff" size="20" /></NavIcon>
                    <NavText> Search </NavText>
                  </Nav>
                  <Nav
                    id="sales2"
                    onNavClick={() => {
                      console.log('Promote clicked!', arguments);
                    }}
                  >
                    <NavIcon><Icon kind="bold" color="#fff" size="16" /></NavIcon>
                    <NavText> Promote </NavText>
                  </Nav>
                  <Nav id="products2">
                    <NavIcon><Icon kind="bold" color="#fff" size="16" /></NavIcon>
                    <NavText> Social Media </NavText>
                  </Nav>
                </Nav>
                <Nav
                  id="sales"
                  onNavClick={() => {
                    console.log('Sales clicked!', arguments);
                  }}
                >
                  <NavIcon><Icon kind="bold" color="#fff" size="16" /></NavIcon>
                  <NavText> Sales </NavText>
                </Nav>
                <Nav id="deliveries">
                  <NavIcon><Icon kind="bold" color="#fff" size="16" /></NavIcon>
                  <NavText> Deliveries </NavText>
                </Nav>
              </SideNav>
            </BaseContainer>
          </Col>
          <Col sm={9}>
            <Tag id="myId2">Small</Tag>
            <Headline size="h1">Hello</Headline>
            <Button kind="primary">Hello</Button>
            <div className="ltr" style={style}>
              Without image<br /><br />
              <Tag id="myId2">Small</Tag>
              <ImageDisplay dataHook="empty-image-viewer" onAddImage={() => {}} />
            </div>
            <div className="ltr" style={style}>
              <Paper zDepth={2} rounded>
                With image<br /><br />
                <ImageDisplay
                  onRemoveImage={() => {}}
                  onUpdateImage={() => {}}
                  imageSrc="https://boldr.io/logo.png"
                />
              </Paper>
            </div>
            <Tooltip
              content="Tooltip appears on hover"
              onClickOutside={null}
              onShow={function noRefCheck() {}}
              shouldCloseOnClickOutside
              theme="light"
              placement="left"
            >
              <div>
                Hover
              </div>
            </Tooltip>
            <Row>
              <Col xs={4} xsOffset={8}>
                <Tooltip
                  content="Tooltip appears on hover"
                  onClickOutside={null}
                  onShow={function noRefCheck() {}}
                  shouldCloseOnClickOutside
                  theme="light"
                  placement="left"
                >
                  <div>
                    Hover
                  </div>
                </Tooltip>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

Home.propTypes = {
  classes: PropTypes.object,
};

export default Home;
