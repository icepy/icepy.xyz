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
            <h1 className="App-My-Tag">我</h1>
            <div className="App-My-Des">安静的夜，但却是昨天。</div>
          </div>
        </div>
        <div className="App-Content">
          <p>
            Hi，我是<strong>“icepy”</strong>，花名 <strong>“象尘”</strong>，联系我请添加微信：<strong>icepy_1988</strong>。
          </p>
          <p>
            <em>Hi, my name is <strong>Icepy</strong>, you could also call me <strong>Xiangchen</strong>. If you are interested in what I am doing now, please contact me through my Wechat ID, which is <strong>icepy_1988</strong>.</em>
          </p>
          <p>作为永远都会写代码的程序猿，2010年开始从事编程的工作，前 <strong>远光-携程-阿里巴巴</strong> 员工，经历了从前端到大前端变革的整个过程，在 <strong>前端，工程化，Hybrid，Weex，Flutter，Node.js，混合架构领域</strong> 等方面有着非常丰富的实践和沉淀，于是成为了一名“核常兼备”很“完善”的工程师。</p>
          <p>
            <em>I stared to work as a front-end developer from 2010 until now, had ever been employed by <strong>YuanGuang, Citrip and Alibaba Group</strong>. All of the different experience make me grow up in this field, and I also have accumulated so much knowledge and practical skills in not only front-end development, but also <strong>Engineering, Hybrid, Weex, Flutter as well as Node.js</strong>. Now I could say that I have already become a “well-appointed” engineer.</em>
          </p>
          <p>
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
            <img 
              src="https://img.shields.io/github/license/icepy/icepy.me.svg" 
              className="App-Svg"
              alt="license"
            />
          </p>
          <p>
            我非常热爱美食和摩托车，拥有一辆春风NK250，喜欢自己折腾摩托车的维修和维护，如果你也热爱摩旅，不妨和我一起聊聊。
          </p>
          <p>
            <em>Except for work, I also love food and motorcycle. I have a Chunfeng NK250, and I usually do the maintenance of the motorcycle by myself, if you like to do Motorcycle Tours, I wish to have a chat with you, so just feel free to contact me.</em>
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
            <em>I am living in Beijing now, doing the work I like, living a happy life. In the end, I have to say thanks to all the friend I have met, you are all valuable treasures to my life.</em>
          </p>
          <p>
            我的微博是 <a 
              href="https://weibo.com/2455876310/profile?topnav=1&wvr=6"
              target="_blank"
              rel="noopener noreferrer"
            >@子曰五溪</a>，
            <em>My Weibo is</em> <a 
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