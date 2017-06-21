import React from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import { Button, Headline, Tooltip, Grid, Tag, Col, Row, ImageDisplay, Paper } from 'boldr-ui';
const style = {
  display: 'inline-block',
  padding: '0 25px 25px',
};

function Home(props) {
  const classes = props.classes;

  return (
    <div>
      <Grid>
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
              imageUrl="https://upload.wikimedia.org/wikipedia/commons/d/dd/New_Mela_Ramanputhur_Holy_Family_Church.jpg"
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
      </Grid>
    </div>
  );
}

Home.propTypes = {
  classes: PropTypes.object,
};

export default Home;
