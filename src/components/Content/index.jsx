import React, { Component } from 'react';
import './style.css';
import bgImage from "../../img/bg.png";
import meishiImage from "../../img/meishi.png";
import qixingImage from "../../img/qixing.png";


const bg = { 
  backgroundImage: `url(${bgImage})`,
}

export default class Content extends Component {
  render(){
    return (
      <div>
        <div className="App-Header-Content">
          <div className="App-Header" style={bg}>
            <h1 className="App-My-Tag">子曰五溪小营地</h1>
            <div className="App-My-Des">给你的生活加点阳光 :)</div>
          </div>
        </div>
        <div className="App-Content">
          <p>
            Hi，我是<strong>子曰五溪</strong>，网络ID <strong>icepy</strong>，花名 <strong>象尘</strong>，联系我请添加微信：<strong>icepy_1988</strong>。
          </p>
          做为永远都会写代码的程序猿，2010年开始从事编程的工作，前 <strong>远光-携程-阿里巴巴</strong> 员工，经历了从前端到大前端变革的整个过程，在 <strong>前端，工程化，Hybrid，Weex，Flutter，Node.js，混合架构领域</strong> 等方面有着非常丰富的实践和沉淀，于是成为了一名“核常兼备”很“完善”的工程师。
          <p>
            <img 
              src="https://img.shields.io/github/license/icepy/icepy.me.svg" 
              className="App-Svg"
              alt="license"
            />
            <a 
              href="https://github.com/icepy/icepy.me/issues/new"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img 
                src="https://img.shields.io/github/issues/icepy/icepy.me.svg" 
                className="App-Svg"
                alt="issues"
              />
            </a>
            <a
              href="https://github.com/icepy"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img 
                src="https://img.shields.io/github/followers/icepy.svg?label=Follow" 
                className="App-Svg"
                alt="github followers"
              />
            </a>
          </p>
          <p>
            我非常热爱美食和摩托车，拥有一辆春风NK250，喜欢自己折腾摩托车的维修和维护，如果你也热爱摩旅，不妨和我一起聊聊。
          </p>
          <div align="center">
            <img src={meishiImage} alt="美食" className="App-Image" />
          </div>
          <div align="center">
            <img src={qixingImage} alt="NK250" className="App-Image" />
          </div>
          <p>
            目前我在北京，从事自己喜欢的工作，快乐认真的生活。最后，我想感谢在我的人生旅途中，遇见的每一位朋友。
          </p>
          <p>
            我的微博是 <a 
              href="https://weibo.com/2455876310/profile?topnav=1&wvr=6"
              target="_blank"
              rel="noopener noreferrer"
            >@子曰五溪</a>
          </p>
        </div>
      </div>
    );
  }
}