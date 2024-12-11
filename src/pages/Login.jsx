import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../components/Footer';

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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://travel.schoolcode.dk/travel/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Store the token in localStorage
        history.push('/main'); // Redirect to MainPage after login
      } else {
        const data = await response.json();
        setError(data.msg || 'Failed to login');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred while trying to log in.');
    }
  };

  return (
    <>
      <Box>
        <LoginCenter>
          <h1>Sign in</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </LoginCenter>

        <FormContainer>
          <form className="generic-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              placeholder="Email*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password*"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit">Login</Button>
          </form>
        </FormContainer>
      </Box>
      <Footer isSticky={true} />
    </>
  );
};

export default Login;
