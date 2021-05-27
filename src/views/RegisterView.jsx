import { Component } from "react";
import { connect } from "react-redux";
import authOps from '../redux/auth/auth-operations'

class RegisterView extends Component {
  state = {
    name: "",
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const { name, value } = event.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onRegister(this.state)

    this.reset();
  };

  reset = () => {
    this.setState({
      name: "",
      email: "",
      password: "",
    });
  };

  render() {
    const { name, email, password } = this.state;
    return (
      <div className="app">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username
            <input name="name" value={name} onChange={this.handleChange} />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              value={email}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              value={password}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}


const mapDispatchToProps = {
  onRegister: authOps.register
}


export default connect(null, mapDispatchToProps )(RegisterView)
