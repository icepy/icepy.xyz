import React, { Component } from 'react';
// import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import './style.css';
import myIcon from "../../img/icon.png";

class Header extends Component {
  render(){
    return (
      <div className="header-container">
        <div className="header-content">
          <div className="header-title">
            <div><a href="/"><img src={ myIcon } alt="" /></a></div>
          </div>
          <div className="header-nav-link">
            <a 
              href="https://zhuanlan.zhihu.com/c_134626828"
              target="_blank"
              rel="noopener noreferrer"
            >
              弗兰人的菜肴
            </a>
            < a 
              href="https://zhuanlan.zhihu.com/fed-talk"
              target="_blank"
              rel="noopener noreferrer"
            >
              LightningMiners
            </a>
            <a
              href="https://github.com/icepy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;