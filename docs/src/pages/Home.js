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
  ResponsiveImage,
} from 'boldr-ui';
import Sidebar from 'docs/src/components/Sidebar';
import IconDemo from '../components/IconDemo';

const Spacer = styled.section`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  height: 20px;
`;
const style = {
  display: 'inline-block',
  padding: '0 25px 25px',
};
const SideNav = withRR4();

function Home(props) {
  const classes = props.classes;

  return (
    <div>
      <Topbar
        url="/"
        onMenuClick={() => console.log('click')}
        avatarUrl="https://boldr.io/assets/boldr-blue-logo.png"
        username="you"
        link={TopbarLink}
        links={[{ title: 'Home', url: '/' }, { title: 'Dashboard', url: '/admin' }]}
      />
      <Grid fluid>
        <Row>
          <Col sm={3}>
            <Sidebar />
          </Col>
          <Col sm={9}>
            <Headline size="h1">Buttons</Headline>
            <Row>
              <Tag id="myId2">Small Tag</Tag>
              <Button kind="secondary" size="small">Small Button</Button>
              <Button kind="primary">Regular Button</Button>
              <Button kind="primary" size="large">Large Button</Button>
              <Tooltip
                content="Tooltip appears on hover"
                onClickOutside={null}
                onShow={function noRefCheck() {}}
                shouldCloseOnClickOutside
                theme="light"
                placement="left"
              >
                <Button kind="primary" outline>Hover Tooltip</Button>
              </Tooltip>
              <Spacer />
              <Button kind="danger" block>Dangerous</Button>
              <Spacer />
            </Row>
            <Headline size="h1">Image Display</Headline>
            <Row>
              <div className="ltr" style={style}>
                Without image<br /><br />

                <ImageDisplay dataHook="empty-image-viewer" onAddImage={() => {}} />
              </div>
              <div className="ltr" style={style}>
                <Paper zDepth={2} rounded noPadding>
                  <ImageDisplay
                    onRemoveImage={() => {}}
                    onUpdateImage={() => {}}
                    imageSrc="https://boldr.io/logo.png"
                  />
                </Paper>
              </div>
            </Row>
            <Row>
              <Headline size="h1">Icons</Headline>
              <IconDemo />
            </Row>
            <Row>
              <Spacer />
              <Headline size="h1">Lazy Load Responsive Image</Headline>
              <ResponsiveImage
                className="test"
                src="http://i.magaimg.net/img/frn.jpg"
                alt="A beautiful image of a tourist attraction in Rome"
                width={800}
                height={575}
                queries={[
                  { minWidth: 600, width: 600, height: 350, quality: 60 },
                  { minWidth: 900, width: 900, height: 600, quality: 60 },
                ]}
              />
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
