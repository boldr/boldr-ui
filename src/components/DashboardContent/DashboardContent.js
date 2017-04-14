import React from 'react';
import styled from 'styled-components';
import type { ReactChildren } from '../../types/react.js.flow';

type Props = {
  children: ReactChildren,
};

const ContentCont = styled.div`
height: 100vh;
width:  100%;
flex-grow: 1;
display: flex;
flex-direction: column;
`;

const DashboardContent = (props: Props) => {
  return (
    <ContentCont { ...props }>
      {props.children}
    </ContentCont>
  );
};

export default DashboardContent;
