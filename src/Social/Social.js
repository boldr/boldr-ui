/* @flow */
import React from 'react';
import styled from 'styled-components';
import Facebook from './Facebook';
import Github from './Github';
import Google from './Google';
import Twitter from './Twitter';
import LinkedIn from './LinkedIn';

const SocialList = styled.ul`
  padding-left: 0;
  list-style-type: none;
  display: inline-flex;
  justify-content: space-between;
`;
const SocialItem = styled.li`
  padding-left: 0;
`;

export type Props = {
  facebook: ?boolean,
  fburl: ?string,
  twitter: ?boolean,
  turl: ?string,
  github: ?boolean,
  ghurl: ?string,
  google: ?boolean,
  gurl: ?string,
  linkedin: ?boolean,
  lurl: ?string,
  iconSize: ?string,
};
const Social = (props: Props) => {
  return (
    <SocialList>
      {props.facebook
        ? <SocialItem><Facebook href={props.fburl} size={props.iconSize} /></SocialItem>
        : null}
      {props.twitter
        ? <SocialItem><Twitter href={props.turl} size={props.iconSize} /></SocialItem>
        : null}
      {props.github
        ? <SocialItem><Github href={props.ghurl} size={props.iconSize} /></SocialItem>
        : null}
      {props.google
        ? <SocialItem><Google href={props.gurl} size={props.iconSize} /></SocialItem>
        : null}
      {props.linkedin
        ? <SocialItem><LinkedIn href={props.lurl} size={props.iconSize} /></SocialItem>
        : null}
    </SocialList>
  );
};
const defaultProps = {
  iconSize: '24px',
};
Social.defaultProps = defaultProps;
export default Social;
