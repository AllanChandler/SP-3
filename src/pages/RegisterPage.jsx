import { useNavigate } from 'react-router-dom'; // For navigation after successful registration
import Register from '../components/Register'; // Import Register component
import facade from '../util/apiFacade';  // Assuming you have an apiFacade to handle registration

const RegisterPage = () => {
  const navigate = useNavigate(); // Hook for navigation

  // The register function that calls the apiFacade's register method
  const register = (username, password) => {
    facade.register(username, password) // Call the register function from the API facade
      .then(() => {
        // Redirect to the login page after successful registration
        navigate('/login');  // You can modify this path as needed
      })
      .catch((err) => {
        console.error('Registration failed:', err);
        alert('Registration failed! Please try again.');
      });
  };

  return (
    <div>
      <h1>Register Page</h1>
      <Register register={register} />  {/* Use Register component */}
    </div>
  );
};

export default RegisterPage;
