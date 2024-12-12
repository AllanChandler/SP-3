import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'; // Import PropTypes

// Styled Components
const Box = styled.div`
  background-color: #efeded;
  padding: 30px;
  border-radius: 10px;
  width: 50%;
  margin: auto;
`;

const LoginCenter = styled.div`
  text-align: center;

  h1 {
    margin-bottom: 20px;
    font-size: 2rem;
    color: #154985;
  }
`;

const FormContainer = styled.div`
  .generic-form {
    display: flex;
    flex-direction: column;
    gap: 10px;

    input[type='text'],
    input[type='password'],
    button {
      padding: 7px;
      border-radius: 5px;
      border: 1px solid silver;
    }
  }
`;

const Button = styled.button`
  background-color: #154985;
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;

  &:hover {
    background-color: #123a6d;
  }
`;

// Component
function LogIn({ login }) {
  const init = { username: '', password: '' };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password); // Call login function from props
  };

  const onChange = (evt) => {
    setLoginCredentials({ ...loginCredentials, [evt.target.id]: evt.target.value });
  };

  return (
    <Box>
      <LoginCenter>
        <h1>Sign in</h1>
      </LoginCenter>
      <FormContainer>
        <form className="generic-form" onSubmit={performLogin}>
          <input
            type="text"
            id="username"
            placeholder="Username"
            onChange={onChange}
            value={loginCredentials.username}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={onChange}
            value={loginCredentials.password}
            required
          />
          <Button type="submit">Login</Button>
        </form>
      </FormContainer>
    </Box>
  );
}

// Add PropTypes validation for the login function prop
LogIn.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LogIn;
