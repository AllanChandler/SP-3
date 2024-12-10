import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: #282c34;
  color: white;
  padding: 10px;
  text-align: center;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <p>&copy; 2024 JourneyHub. All Rights Reserved.</p>
    </FooterWrapper>
  );
};

export default Footer;
