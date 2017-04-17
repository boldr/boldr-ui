import React from 'react';
import styled from 'styled-components';
import Link from 'react-router-dom/Link';
import type { ReactChildren } from '../../types/react.js.flow';

type Props = {
  children: ReactChildren,
  isPrimaryColor: string,
  logoImg: string,
  logoLink: string,
};

const LogoElement = styled.div`
  justify-content: center;
  width: 100%;
  position: relative;
  margin: 0 auto;
`;
const InfoElement = styled.div`
  padding-left: 6px;
  padding-top: 6px;
`;
const SidebarHeader = (props: Props) => {
  const SbHeader = styled.div`
    display: block;
    position: relative;
    height: 60px;
    background-color:${props => props.isPrimaryColor ? '#00bcd4' : '#fff'};
    line-height: 60px;
    padding: 0 18px;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
  `;
  return (
    <SbHeader { ...props }>
      <LogoElement>
        <Link to={ props.logoLink }><img
          src={ props.logoImg }
          className="boldrui-sidebar-header-logo"
          style={ { width: '100px' } }
        /></Link>
      </LogoElement>
      {props.children}
    </SbHeader>
  );
};

SidebarHeader.defaultProps = {
  logoImg: 'https://boldr.io/logo.png',
  isPrimaryColor: true,
};

export default SidebarHeader;
