import styled from 'styled-components';
import PropTypes from 'prop-types';

const FooterWrapper = styled.footer.withConfig({
  shouldForwardProp: (prop) => prop !== 'isSticky',
})`
  background-color: #041635;
  color: white;
  padding: 10px;
  text-align: center;
  width: 100%;
  
  position: ${props => (props.$isSticky ? 'fixed' : 'relative')};
  bottom: ${props => (props.$isSticky ? '0' : 'auto')};
  left: 0;
  right: 0;
  z-index: 1000;
`;

const Footer = ({ isSticky = false }) => {  
  return (
    <FooterWrapper $isSticky={isSticky}>
      <p>&copy; 2024 JourneyHub. All Rights Reserved.</p>
    </FooterWrapper>
  );
};

Footer.propTypes = {
  isSticky: PropTypes.bool,
};

export default Footer;
