import React from 'react'

export default function logined() {
    return (
      <div>
  <div className="login-page" id="login">
    <h1>Đăng nhập tài khoản</h1>
    <div className="input-box">
      <i className="fa fa-user-o" />
      <input type="text" placeholder="Họ và Tên" id="user" /> 
    </div>
    <div className="input-box">
      <i className="fa fa-key" />
      <input type="password" placeholder="Mật Khẩu" id="pwd" />
      <span className="eye" id="eye-icon">
        <i className="fa fa-eye" id="hide-eye" />
        <i className="fa fa-eye-slash" id="hide-eye-slash" />
      </span>
    </div>
    <button type="button" className="login-button" onclick="loginClick()">Đăng Nhập</button>
  </div>
  <div className="login-page" id="hello">
    <h3>Xin chào</h3>
    <h1 id="user-name">Tên Đăng Nhập</h1>
    <p><a href="#" onclick="logoutClick()">Đăng xuất?</a></p>
  </div>
</div>


    )
}
