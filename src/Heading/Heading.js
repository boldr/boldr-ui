import styled from 'styled-components';

const Heading = styled.span`
  margin-bottom: ${props => props.theme.headings.marginBottom};
  font-family: ${props => props.theme.headings.fontFamily};
  font-weight: ${props => props.theme.headings.fontWeight};
  line-height: ${props => props.theme.headings.lineHeight};
  color: ${props => props.theme.fontColor.dark};
  ${props => {
    switch (props.size) {
      case 'h1':
        return `font-size: ${props.theme.headings.size.h1};`;
      case 'h2':
        return `font-size: ${props.theme.headings.size.h2};`;
      case 'h3':
        return `font-size: ${props.theme.headings.size.h3};`;
      case 'h4':
        return `font-size: ${props.theme.headings.size.h4};`;
      case 'h5':
        return `font-size: ${props.theme.headings.size.h5};`;
      case 'h6':
        return `font-size: ${props.theme.headings.size.h6};`;
      default:
        return `font-size: ${props.theme.headings.size.h1};`;
    }
  }};
`;

Heading.H1 = Heading.withComponent('h1').extend`
  ${props => !props.size && `${`font-size: ${props.theme.headings.size.h1};`}`}
`;

Heading.H2 = Heading.withComponent('h2').extend`
  ${props => !props.size && `${`font-size: ${props.theme.headings.size.h2};`}`}
`;

Heading.H3 = Heading.withComponent('h3').extend`
  ${props => !props.size && `${`font-size: ${props.theme.headings.size.h3};`}`}
`;

Heading.H4 = Heading.withComponent('h4').extend`
  ${props => !props.size && `${`font-size: ${props.theme.headings.size.h4};`}`}
`;

Heading.H5 = Heading.withComponent('h5').extend`
  ${props => !props.size && `${`font-size: ${props.theme.headings.size.h5};`}`}
`;

Heading.H6 = Heading.withComponent('h6').extend`
  ${props => !props.size && `${`font-size: ${props.theme.headings.size.h6};`}`}
`;

Heading.defaultProps = {
  theme: {
    fontColor: {
      dark: '#030507',
    },
    headings: {
      fontWeight: 700,
      lineHeight: 1.1,
      fontFamily: '"Chivo", Cambria, Times New Roman, Times, serif',
      marginBottom: '.5rem',
      size: {
        h1: '2.5rem',
        h2: '2rem',
        h3: '1.75rem',
        h4: '1.5rem',
        h5: '1.25rem',
        h6: '1rem',
      },
    },
  },
};

export default Heading;
