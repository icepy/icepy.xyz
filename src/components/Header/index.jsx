import React, { Component } from 'react';
// import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import './style.css';
import myIcon from "../../img/icon.jpeg";

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
              href="https://mirror.xyz/icepy.eth"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mirror
            </a>
            <a
              href="https://github.com/icepy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
            <a
              href="https://gitcoin.co/icepy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gitcoin
            </a>
            <a
              href="https://twitter.com/i_icepy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;