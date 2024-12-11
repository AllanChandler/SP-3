import { useState } from 'react';
import facade from '../util/apiFacade'; // Import facade for API calls

function Register() {
  const [userCredentials, setUserCredentials] = useState({ username: '', password: '' });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    facade.register(userCredentials.username, userCredentials.password)
      .then(() => {
        // Redirect to login page after successful registration
        window.location.href = '/login';
      })
      .catch((err) => {
        console.error('Registration failed', err);
        // Handle error (e.g., show a message to the user)
      });
  };

  const handleChange = (evt) => {
    setUserCredentials({ ...userCredentials, [evt.target.id]: evt.target.value });
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          value={userCredentials.username}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          value={userCredentials.password}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
