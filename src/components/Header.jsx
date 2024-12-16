import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/logo.png';
import facade from '../util/apiFacade'; 

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
  width: 150px;
  height: auto;
  margin-left: 60px;
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

const WelcomeSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  span {
    font-size: 16px;
    color: white;
    margin-right: 10px;
  }

  button {
    padding: 5px 10px;
    background-color: #f44336;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;

    &:hover {
      background-color: #d32f2f;
    }
  }
`;

const Header = ({ loggedIn, username, logout }) => {

  const isAdmin = facade.hasUserAccess('admin');

  return (
    <HeaderWrapper>
      <LogoContainer>
        <LogoImage src={Logo} alt="Logo" />
      </LogoContainer>
      <Nav>
        <Link to="/">Home</Link> |
        <Link to="/vision">Vision</Link> |
        {!username && <><Link to="/login">Login</Link> |</>}
        {isAdmin && (
          <>
            <Link to="/admin">Administration</Link> |
          </>
        )}
        {loggedIn && (
          <>
            <Link to="/reviews">Reviews</Link> |
          </>
        )}
        <Link to="/country-info">Country Info</Link>
      </Nav>

      {loggedIn ? (
        <WelcomeSection>
          <span>Welcome, {username}</span>
          <button onClick={logout}>Logout</button>
        </WelcomeSection>
      ) : null}
    </HeaderWrapper>
  );
};

// Add PropTypes validation for 'loggedIn' prop
Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};

export default Header;
