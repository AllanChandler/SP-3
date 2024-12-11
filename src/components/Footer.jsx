import styled from 'styled-components';
import PropTypes from 'prop-types'; // Importér prop-types

const FooterWrapper = styled.footer`
  background-color: #041635;
  color: white;
  padding: 10px;
  text-align: center;
  width: 100%;
  
  position: ${props => (props.isSticky ? 'fixed' : '')};
  bottom: ${props => (props.isSticky ? '0' : 'auto')};
  left: 0;
  right: 0;
  z-index: 1000;
`;

const Footer = ({ isSticky }) => {
  return (
    <FooterWrapper isSticky={isSticky}>
      <p>&copy; 2024 JourneyHub. All Rights Reserved.</p>
    </FooterWrapper>
  );
};

// Props validation with PropTypes
Footer.propTypes = {
  isSticky: PropTypes.bool, // isSticky should be a boolean
};

// Optional default prop (if isSticky is not provided)
Footer.defaultProps = {
  isSticky: false, // Default value for isSticky if not passed
};

export default Footer;

