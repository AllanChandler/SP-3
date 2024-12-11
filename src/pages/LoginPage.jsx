import { useNavigate } from 'react-router-dom'; // For navigation after successful login
import LogIn from '..components/Login'; // Import the LogIn component
import facade from '../util/apiFacade';  // Assuming you have an apiFacade to handle login

const LoginPage = () => {
  const navigate = useNavigate(); // Hook for navigation

  // The login function that calls the apiFacade's login method
  const login = (username, password) => {
    facade.login(username, password) // Call the login function from the API facade
      .then(() => {
        // Redirect to the homepage after successful login
        navigate('/');  // You can modify this path as needed
      })
      .catch((err) => {
        console.error('Login failed:', err);
        alert('Login failed! Please try again.');
      });
  };

  return (
    <div>
      <h1>Login Page</h1>
      <LogIn login={login} />  {/* Use the LogIn component */}
    </div>
  );
};

export default LoginPage;
