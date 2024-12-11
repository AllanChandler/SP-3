import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/logo.png'; // Update the path as needed


const HeaderWrapper = styled.header`
  background-color: #041635;
  padding: 20px;
  text-align: center;
  color: white;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 150px;  // Adjust size as needed
  height: auto;
  margin-left: 60px;  // Add some space from the left edge
`;

const Nav = styled.nav`
  margin-top: -38px;

  a {
    color: white;
    text-decoration: none;
    margin: 0 20px;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
       <LogoContainer>
        <LogoImage src={Logo} alt="Logo" />
      </LogoContainer>
      <Nav>
        <Link to="/">Home</Link> |
        <Link to="/vision"> Vision</Link> |
        <Link to="/endpoints"> Endpoints</Link> |
        <Link to="/login">Login</Link> |
        <Link to="/admin">Administration</Link> |
        <Link to="/country-info"> Country Info</Link>
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
