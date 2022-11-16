import React, { useState } from "react";
import api from "../api";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const setError = (message) => toast.error(message);
  const onSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    if (isLogin) _login(username, password, setError);
    else _signup(username, password, setError);
  };

  return (
    <div className="login">
      <div className="container">
        <form onSubmit={onSubmit}>
          <h1>Notes</h1>
          <label htmlFor="username">Username</label>
          <input
            type={"text"}
            id={"username"}
            required
            minLength={6}
            maxLength={36}
          />
          <label htmlFor="password">Password</label>
          <input
            type={"password"}
            id={"password"}
            required
            minLength={6}
            maxLength={100}
          />
          <div className="buttons">
            <button type={"submit"} onClick={() => setIsLogin(true)}>
              Login
            </button>
            <button
              type={"submit"}
              onClick={() => setIsLogin(false)}
              className="signup"
            >
              SignUp
            </button>
          </div>
        </form>
      </div>
      <ToastContainer style={{ width: 350 }} position={"bottom-right"} />
    </div>
  );
};

export default Login;

const _login = (username, password, setError) =>
  api("/auth/login", "POST", { username, password }).then((res) => {
    if (res.status === 200) window.location.reload();
    else setError(res.data.message);
  });

const _signup = (username, password, setError) =>
  api("/auth/signup", "POST", { username, password }).then((res) => {
    if (res.status === 201) window.location.reload();
    else setError(res.data.message);
  });
