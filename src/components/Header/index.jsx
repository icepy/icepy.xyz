import React, { Component } from 'react';
import './style.css';
import meishiIcon from "../../img/meishi.png";

const navLink = [
  {
    name: "美食专栏",
    link: "https://zhuanlan.zhihu.com/c_134626828"
  },
  {
    name: "程序员专栏",
    link: "https://zhuanlan.zhihu.com/fed-talk"
  },
  {
    name: "尤克里里专栏",
    link: "https://zhuanlan.zhihu.com/uulili"
  },
  {
    name: "知乎",
    link: "https://www.zhihu.com/people/wen-xiang-34/activities"
  },
  {
    name: "Github",
    link: "https://github.com/icepy"
  },
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