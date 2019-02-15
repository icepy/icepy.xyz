import React, { Component } from 'react';
import './style.css';
import meishiIcon from "../../img/meishi.png";

const navLink = [
  {
    name: "我们可以学更多",
    link: "https://zhuanlan.zhihu.com/fed-talk"
  },
  {
    name: "周末例行",
    link: "https://zhuanlan.zhihu.com/c_134626828"
  },
  {
    name: "摩托车维修艺术",
    link: "https://zhuanlan.zhihu.com/c_1079775594526412800"
  }
];

class Header extends Component {
  render(){
    return (
      <div className="header-container">
        <div className="header-title">
          <div><img src={ meishiIcon } alt="" /></div>
          <a href="/">子曰五溪</a>
        </div>
        <div className="header-nav-link">
          {
            navLink.map((v,i) => {
              return (
                <a 
                  key={i} 
                  href={v.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {v.name}
                </a>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default Header;