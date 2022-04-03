import React, { Component } from 'react';
import './style.css';
import bgImage from "../../img/bg.jpeg";

export default class Content extends Component {
  render(){
    return (
      <div>
        <div className="App-Header-Content">
          <div className="App-Header">
            <img src={bgImage} height="300" alt="" />
          </div>
        </div>
        <div className="App-Content">
          <p>
            你好，我是<strong>“wen（五溪）”</strong>。 
          </p>
          <p>  
            2012年开始从事编程的工作，经历了从前端到大前端变革的整个过程。
          </p>
          <p>
            深入理解 <strong>移动跨平台架构领域</strong> 的设计和原理，
            在 <strong>Web前端，移动Hybrid容器架构，小程序容器架构</strong> 上有着丰富的实践和沉淀，
            其他技术方向上如 Node.js Rust 都有一定的涉猎。
          </p>
          <p>热衷于 Web3 技术的内容分享，深入理解 <strong>以太坊平台</strong> 的设计与原理，熟练 Solidity ethers.js Graph Chainlink 等开发技术，声明：<strong>并未参与任何区块链项目</strong>。</p>
          <p>在团队管理方面追求务实，有效沟通，有能力带领团队解决问题，完成目标，落实结果。</p>
          <p>
            在生活里我喜欢烹饪食物和骑着摩托车自由旅行，如果你也热衷于摩托车旅行，不妨坐下来和我聊聊。
          </p>
          <ul>
            <li>
              <a
                href="https://mp.weixin.qq.com/s/L-h6Hh6XlSL09Uy2d3ro2A"
                target="_blank"
                rel="noopener noreferrer"
              >
                二千多公里-怀化至大理
              </a>
            </li>
            <li>
              <a 
                href="https://mp.weixin.qq.com/s/6VphoytSWRPbhMDD3-Tg4Q"
                target="_blank"
                rel="noopener noreferrer"
              >
                一个人一辆摩托车：走遍中国（一）
              </a>
            </li>
          </ul>
          <p>
            目前我在大湘西，从事自己喜欢的工作，认真快乐的生活。
          </p>
          <p>
            最后我想感谢在我人生旅途中，遇见的你们。
          </p>
          <p>
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
        </div>
      </div>
    );
  }
}