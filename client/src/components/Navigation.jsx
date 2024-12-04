import React from 'react';
import '../styles/Navigation.css';
import logo from "../assets/logo.png";

function Navigation() {
  return (
      <div className="Navigation">
          <img className="Logo" src={logo} alt="logo"/>
          <div className="Spacer"/>
          <a className="Apply" href={"/"}>지원하기</a>
          <div className="LangBox">
              <a className="Lang" href={"/"}>ENG</a>
              <div className="Divider"></div>
              <a className="Lang" href={"/"} style={{color: "#5F5F5F"}}>KOR</a>
          </div>
      </div>
  );
}

export default Navigation;
