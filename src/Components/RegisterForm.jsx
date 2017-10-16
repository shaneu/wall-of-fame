import * as React from 'react';
import { registerUser } from '../client-helpers';

class RegisterForm extends React.Component {
  state = {
    fields: {
      email: '',
      name: '',
      password: '',
      'password-confirm': '',
    },
  };

  handleChange = event => {
    const fields = Object.assign({}, this.state.fields);
    fields[event.target.name] = event.target.value;
    this.setState({ fields });
  };

  handleSubmit = event => {
    registerUser(this.state.fields);
    event.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Register</h2>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" required value={this.state.fields.name} onChange={this.handleChange} />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" value={this.state.fields.email} onChange={this.handleChange} />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          value={this.state.fields.password}
          onChange={this.handleChange}
        />
        <label htmlFor="password-confirm">Confirm password</label>
        <input
          type="password"
          name="password-confirm"
          id="password-confirm"
          required
          value={this.state.fields['password-confirm']}
          onChange={this.handleChange}
        />
        <button type="submit">Register</button>
      </form>
    );
  }
}

export default RegisterForm;
