import { useState } from 'react';
import PropTypes from 'prop-types';  // Import PropTypes

function Register({ register }) {
  const init = { username: '', password: '' };
  const [registerCredentials, setRegisterCredentials] = useState(init);

  const performRegister = (evt) => {
    evt.preventDefault();
    register(registerCredentials.username, registerCredentials.password); // Call register function from props
  };

  const onChange = (evt) => {
    setRegisterCredentials({ ...registerCredentials, [evt.target.id]: evt.target.value });
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={performRegister}>
        <input
          placeholder="User Name"
          id="username"
          onChange={onChange}
          value={registerCredentials.username}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={onChange}
          value={registerCredentials.password}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
};

export default Register;
