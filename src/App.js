import React, { Component } from 'react';
import './App.css';
import Header from "./components/Header";
import bgImage from "./img/bg.jpg";


const bg = { 
  backgroundImage: `url(${bgImage})`,
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="App-Header" style={bg}>
          <h1 className="App-My-Tag">子曰五溪小营地</h1>
          <div className="App-My-Des">给你的生活加点阳光 :)</div>
        </div>
        <div className="App-Content">
          <p>
            Hi，我是<strong>子曰五溪</strong>，网络ID <strong>icepy</strong>，花名 <strong>象尘</strong>，联系我请添加微信：<strong>icepy_1988</strong>。
          </p>
          做为永远都会写代码的程序员，2010开始从事编程的工作，前 <strong>远光-携程-阿里巴巴</strong> 员工，经历了从前端到大前端变革的整个过程，在 <strong>工程化, Hybrid, Weex, Flutter, Node.js, 混合架构领域</strong> 等方面有着非常丰富的经验，于是成为了一个“核常兼备”很“完善”的工程师。
          <p>
            我非常热爱美食和户外骑行，拥有一辆春风NK250，喜欢自己折腾摩托车的维修和维护，如果你也热爱摩旅，不妨一起聊聊。
            目前我在北京，从事自己喜欢的工作，努力快乐的生活，最后我想感谢我的人生旅途中所遇到的每一个人。
          </p>
          <p>
            我的微博 <a 
              href="https://weibo.com/2455876310/profile?topnav=1&wvr=6"
              target="_blank"
              rel="noopener noreferrer"
            >@子曰五溪</a>;
          </p>
        </div>
      </div>
    );
  }
}

export default App;
