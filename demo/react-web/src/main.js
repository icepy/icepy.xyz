import React from 'react';
import {render} from 'react-dom';
import {Router,Route,Link} from 'react-router';

const App = React.createClass({
    getInitialState:function(){
      	return{
        	router: window.location.hash.substr(1)
      	}
    },
    componentDidMount:function(){
    	window.addEventListener('hashchange',()=>{
    		this.setState({
    			router:window.location.hash.substr(1)
    		});
    	});
    },
    render:function(){
        return (
          	<div className="am-container">
          		<div>
          			<button type="button" className="am-btn am-btn-warning">
	          			<Link to='/inbox'>获取列表</Link>
	          		</button>
	          		<button type="button" className="am-btn am-btn-warning">
	          			<Link to='/about'>关于我</Link>
	          		</button>
          		</div>
          		{this.props.children}
          	</div>
        );
    }
});

const InboxList = React.createClass({
	render:function(){
		let inboxInfo = this.props.inboxInfo;
		return(
			<table className="am-table">
				 <thead>
			        <tr>
			            <th>Inbox</th>
			        </tr>
			    </thead>
			    <tbody>
			    {inboxInfo.map((info,i) => {
			    	return (
		    			<tr key={("icepy"+i)} onClick={this.handle.bind(this)}>
		    				<td>{info}</td>
		    			</tr>
		    		)
			    })}
				</tbody>
			</table>
		)
	}
});

const Inbox = React.createClass({
	getInitialState:function(){
		return{
			inboxInfo:['icepy','wower','books']
		}
	},
	render:function(){
		return (
			<div className="am-container">
				<InboxList inboxInfo={this.state.inboxInfo}/>
			</div>
		)
	}
});

const About = React.createClass({
	render:function(){
		return (
			<div className="am-container">
				<AboutMe/>
			</div>
		)
	}
});

const AboutMe = React.createClass({
	render:function(){
		return (
			<h1>
				icepy
			</h1>
		)
	}
})

/**
 * 	browserify-shim
 *
 * 	在package.json 中配置shim，可以将react react-dom react-router当script脚本在index.html中引入
 * "browserify-shim": {
 *   	"react": "global:React",
 *    	"react-dom": "global:ReactDOM",
 *    	"react-router":"global:ReactRouter"
 *	}
 */

render((
	<Router>
		<Route path="/" component={App}>
			<Route path="about" component={About} />
      		<Route path="inbox" component={Inbox} />
		</Route>
	</Router>
),document.getElementById('container'));