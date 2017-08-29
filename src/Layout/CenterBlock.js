/* @flow */
import * as React from 'react';

import Row from './Row';
import Col from './Col';

type Props = {
  children: Array<React.Node>,
};

const CenterBlock = (props: Props) => {
  return (
    <Row xsCenter>
      <Col xs={6}>{props.children}</Col>
    </Row>
  );
};

export default CenterBlock;
