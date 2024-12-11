import { useState } from 'react';
import facade from '../util/apiFacade'; // Import facade for API calls

function LogIn() {
  const init = { username: '', password: '' };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (evt) => {
    evt.preventDefault();
    facade.login(loginCredentials.username, loginCredentials.password)
      .then(() => {
        // Redirect to homepage after successful login
        window.location.href = '/';
      })
      .catch((err) => {
        console.error('Login failed', err);
        // Handle error (e.g., show a message to the user)
      });
  };

  const onChange = (evt) => {
    setLoginCredentials({ ...loginCredentials, [evt.target.id]: evt.target.value });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={performLogin}>
        <input
          placeholder="User Name"
          id="username"
          onChange={onChange}
          value={loginCredentials.username}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={onChange}
          value={loginCredentials.password}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LogIn;
