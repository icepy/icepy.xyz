import React from 'react';
import {render} from 'react-dom';
import {Router,Route,Link} from 'react-router';


class TableView extends React.Component{
	shouldComponentUpdate(){
		return true;
	}
	render(){
		let value = this.props.date.getTime();
		let style = {
			paddingTop:'10px'
		};
		return(
			<div style={style}>
				<input type="text" placeholder="table view" defaultValue={value} onChange={this.handlerChange}/>
				It is {this.props.date.toTimeString()}
			</div>
		);
	}
	handlerChange(event){
		this.setState({
			tableValue:event.target.value.substr(0,50)
		});
	}
}

const App = React.createClass({
    getInitialState:function(){
      	return{
        	router: window.location.hash.substr(1)
      	};
    },
    componentDidMount:function(){
    	window.addEventListener('hashchange',()=>{
    		this.setState({
    			router:window.location.hash.substr(1)
    		});
    	});
    },
    render:function(){
    	let style = {
    		paddingTop:'15px'
    	};
        return (
          	<div className="am-container" style={style}>
          		{this.props.children}
          	</div>
        );
    }
});

const Navigation = React.createClass({
	render:function(){
		return (
  			<div>
  				<button type="button" className="am-btn am-btn-warning">
	      			<Link to='/inbox'>获取列表</Link>
	      		</button>
	      		<button type="button" className="am-btn am-btn-warning">
	      			<Link to='/about'>关于我</Link>
	      		</button>
  			</div>
		);
	}
});

const InboxList = React.createClass({
	render:function(){
		let inboxInfo = this.props.inboxInfo.map((info,i)=>{
			return (
				<tr key={("icepy"+i)} onClick={this.handleClick.bind(this,i)}>
    				<td>{info}</td>
    			</tr>
			);
		});
		let style = {
			color:'red',
			fontSize:'12px'
		};
		return(
			<div style={style}>
				<Navigation/>
				<table className="am-table">
					 <thead>
				        <tr>
				            <th>Inbox</th>
				        </tr>
				    </thead>
				    <tbody>
				    	{inboxInfo}
					</tbody>
				</table>
			</div>
		);
	},
	handleClick:function(e,i){
		console.log(e);
		console.log(i);
	}
});

const Inbox = React.createClass({
	getInitialState:function(){
		return{
			inboxInfo:['icepy','wower','books']
		};
	},
	render:function(){
		return (
			<div className="am-container">
				<InboxList inboxInfo={this.state.inboxInfo}/>
			</div>
		);
	}
});

const About = React.createClass({
	render:function(){
		return (
			<div className="am-container">
				<Navigation/>
				<AboutMe/>
			</div>
		);
	}
});

const AboutMe = React.createClass({
	render:function(){
		let style = {
			color:'red',
			fontSize:'12px'
		};
		return (
			<div className="am-container" style={style}>
				<TableView date={new Date()}/>
			</div>
		);
	}
});

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
