import * as React from 'react';

function LoginForm() {
  return (
    <form>
      <h2>Login</h2>
      <label htmlFor="email">Email Address</label>
      <input type="email" name="email" id="email" required />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" required />
    </form>
  );
}

export default LoginForm;
