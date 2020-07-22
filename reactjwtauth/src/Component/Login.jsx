import React from "react";
import { login } from "../PostData";
import styled from "./LoginCss.module.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: false,
      token: "",
      loading: false,
    };
  }

  handleUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handlePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleLogin = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    login("admin@email.com", "admin123")
      .then((res) => {
        // console.log(res)
        if (res.status === "success") {
          this.setState({
            token: res.access_token,
          });
          localStorage.setItem(`bearerToken`, this.state.token);
          this.setState({
            redirect: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("bearerToken");
    this.setState({
      redirect: false,
      loading: false,
    });
  };

  render() {
    if (this.state.redirect) {
      return (
        <div>
          <h1>Kamu telah login</h1>
          <button type='submit' onClick={this.handleLogout}>
            Log Out
          </button>
        </div>
      );
    } else if (this.state.loading) {
      return <h1>Loading....</h1>;
    } else {
      return (
        <div className={styled.container}>
          <div>
            <h2 className={styled.header_content}>Login Cuk</h2>
          </div>
          <div className={styled.form_style}>
            <label className={styled.label}>Username</label> <br />
            <input
              className={styled.input}
              type='email'
              name=''
              placeholder='Username'
              onChange={this.handleUsername}
              value={this.state.username}
            />{" "}
            <br />
            <label className={styled.label}>Pasword</label>
            <br />
            <input
              className={styled.input}
              type='password'
              name=''
              placeholder='Password'
              onChange={this.handlePassword}
              value={this.state.password}
            />{" "}
            <br />
            <button
              className={styled.btn}
              type='submit'
              onClick={this.handleLogin}>
              Login
            </button>
          </div>
        </div>
      );
    }
  }
}

export default Login;
