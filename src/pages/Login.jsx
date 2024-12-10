import React from 'react';

const Login = () => {
  return (
    <div>
      <h2>Login</h2>
      <form>
        <input type="text" placeholder="Brugernavn" />
        <input type="password" placeholder="Adgangskode" />
        <button type="submit">Log ind</button>
      </form>
    </div>
  );
};

export default Login;
