import React, { useEffect, useState } from "react";
import "./SignIn.css";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../utils/axiosClient";

export default function SignIn() {
  const [state, setState] = useState({});
  let navigate = useNavigate();

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  async function handleLogin() {
    try {
      const res = await axiosClient.post("/auth/sign-in", state);
      localStorage.setItem("token", (res.token));
      if (localStorage.getItem("token")) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="login-page" id="login">
        <h1>Đăng nhập</h1>
        <div className="input-box">
          <i className="fa fa-user-o" />
          <input
            type="text"
            placeholder="Nhập Email"
            id="user"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="input-box">
          <i className="fa fa-key" />
          <input
            type="password"
            placeholder="Nhập Mật Khẩu"
            id="pwd"
            name="password"
            onChange={handleChange}
          />
          <span className="eye" id="eye-icon">
            <i className="fa fa-eye" id="hide-eye" />
            <i className="fa fa-eye-slash" id="hide-eye-slash" />
          </span>
        </div>
        <button type="button" className="login-button" onClick={handleLogin}>
          Đăng Nhập
        </button>
      </div>
      <div className="login-page" id="hello">
        <h3>Xin chào</h3>
        <h1 id="user-name">Tên Đăng Nhập</h1>
        <p>
          <button href="#">Đăng xuất?</button>
        </p>
      </div>
    </div>
  );
}
