import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'; // Import PropTypes

// Styled Components for consistency with the login page
const Box = styled.div`
  background-color: #efeded;
  padding: 30px;
  border-radius: 10px;
  width: 50%;
  margin: auto;
`;

const RegisterCenter = styled.div`
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

// Register component to register a new user
function Register({ registerUser }) {
  const init = { username: '', password: '' };
  const [registerCredentials, setRegisterCredentials] = useState(init);
  const [error, setError] = useState('');

  const performRegister = (evt) => {
    evt.preventDefault();
    registerUser(registerCredentials.username, registerCredentials.password)
      .then(() => {
        setError('');
        alert('User registered successfully!');
      })
      .catch((err) => {
        setError('Error registering user: ' + err.message);
      });
  };

  const onChange = (evt) => {
    setRegisterCredentials({ ...registerCredentials, [evt.target.id]: evt.target.value });
  };

  return (
    <Box>
      <RegisterCenter>
        <h1>Register</h1>
      </RegisterCenter>
      <FormContainer>
        <form className="generic-form" onSubmit={performRegister}>
          <input
            type="text"
            id="username"
            placeholder="Username"
            onChange={onChange}
            value={registerCredentials.username}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={onChange}
            value={registerCredentials.password}
            required
          />
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <Button type="submit">Register</Button>
        </form>
      </FormContainer>
    </Box>
  );
}

// Add PropTypes validation for the register function prop
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
};

export default Register;
