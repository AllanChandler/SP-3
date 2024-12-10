import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  background-color: #282c34;
  padding: 20px;
  text-align: center;
  color: white;
`;

const Nav = styled.nav`
  margin-top: 10px;

  a {
    color: white;
    text-decoration: none;
    margin: 0 10px;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <h1>JourneyHub</h1>
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
