import React from 'react';
import styled from 'styled-components';
import type { ReactChildren } from '../../types/react.js.flow';

type Props = {
  children: ReactChildren,
};

const Dash = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: relative;
`;

const DashboardWrapper = (props: Props) => {
  return (
    <Dash { ...props }>
      {props.children}
    </Dash>
  );
};

export default DashboardWrapper;
