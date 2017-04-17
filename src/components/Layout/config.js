import {css} from 'styled-components';

const THEME_CONF = 'gridsys';
export const BASE_CONF = {
  gridSize: 12,
  gutterWidth: 1,
  outerMargin: 2,
  container: {
    sm: 46,
    md: 61,
    lg: 76,
  },
  breakpoints: {
    xs: 0,
    sm: 768,
    md: 1024,
    lg: 1200,
  },
};

const configCache = [];
const makeCacheId = props =>
  JSON.stringify((props.theme && props.theme[THEME_CONF]) || {});
const resolveConfig = props => {
  const themeConf = (props.theme && props.theme[THEME_CONF]) || {};

  const conf = {
    ...BASE_CONF,
    ...themeConf,
    container: {
      ...BASE_CONF.container,
      ...themeConf.container,
    },
    breakpoints: {
      ...BASE_CONF.breakpoints,
      ...themeConf.breakpoints,
    },
  };

  conf.media = Object.keys(conf.breakpoints).reduce((media, breakpoint) => {
    const breakpointWidth = conf.breakpoints[breakpoint];
    media[breakpoint] = makeMedia(
      `only screen${breakpointWidth === 0 ? '' : ` and (min-width: ${breakpointWidth + 1}px)`}`, // eslint-disable-line
    );
    return media;
  }, {});

  return conf;
};

export const DIMENSION_NAMES = ['xs', 'sm', 'md', 'lg'];

export default function config(props) {
  const cacheId = makeCacheId(props);
  if (configCache[0] === cacheId) {
    return configCache[1];
  }

  const conf = resolveConfig(props);

  configCache[0] = cacheId;
  configCache[1] = conf;

  return conf;
}

function makeMedia(media) {
  return (...args) => css`
    @media ${media} {
      ${css(...args)}
    }
  `;
}
