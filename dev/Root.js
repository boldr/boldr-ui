import React, { Component } from 'react';
import '../src/styles/boldrui.scss';

import { Grid, Loader, Col, Row, Footer, Heading, FormGroup, StatsWidget } from '../src/components';
import Paper from '../src/components/Paper';

class Root extends Component {
  render() {
    const testStats = {
      posts: 3,
      users: 4,
      tags: 3,
      dogs: 9,
      cats: 0,
    };
    return (
      <div>
        <Grid>
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
        <Footer />
      </div>
    );
  }
}

export default Root;
