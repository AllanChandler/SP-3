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
  return (
    <>
      <Box>
        <LoginCenter>
          <h1>Sign in</h1>
        </LoginCenter>

        <FormContainer>
          <form className="generic-form" method="post">
            <input type="text" name="email" placeholder="Email*" required />
            <input type="password" name="password" placeholder="Password*" required />
            <Button type="submit" formaction="/login">Login</Button>
            
          </form>
        </FormContainer>

      </Box>
      <Footer isSticky={true} />
    </>
  );
};

export default Login;

