import styled from 'styled-components';
import PropTypes from 'prop-types';

const Paragraph = styled.p`
  margin: 0 0 1.5rem;
  font-size: ${props => (props.isLead ? '1.3rem' : '1rem')};
  line-height: ${props => (props.isLead ? '2' : '1.5')};
  color: ${props =>
    props.isLight ? `${props.theme.fontColor.light}` : `${props.theme.fontColor.dark}`};
`;

Paragraph.propTypes = {
  isLead: PropTypes.bool,
  isLight: PropTypes.bool,
  theme: PropTypes.shape({
    fontColor: PropTypes.shape({
      light: PropTypes.string,
      dark: PropTypes.string,
    }),
  }),
};

Paragraph.defaultProps = {
  isLead: false,
  isLight: false,
  theme: {
    fontColor: {
      light: '#F7F7F9',
      dark: '#030507',
    },
  },
};

export default Paragraph;
