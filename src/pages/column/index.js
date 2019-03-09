import React, { Component } from 'react';
import './style.css';

const navLink = [
  {
    name: "lightningMiners",
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
export default class ColumnPage extends Component {
  render(){
    return (
      <div className="App-Content column-container">
        <ul>
          {
            navLink.map((v,i) => {
              return (
                <li>
                  
                  <a 
                    key={i} 
                    href={v.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {v.name}
                  </a>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}