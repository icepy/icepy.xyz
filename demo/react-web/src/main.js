import React from 'react';
import {render} from 'react-dom';
import {Router,Route} from 'react-router';
import DateReact from './date';
import About from './about';
import Inbox from './inbox';

const App = React.createClass({
    getInitialState(){
      	return{
        	router: window.location.hash.substr(1)
      	};
    },
    componentDidMount(){
    	window.addEventListener('hashchange',()=>{
    		this.setState({
    			router:window.location.hash.substr(1)
    		});
    	});
    },
    render(){
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
      		<Route path="date" component={DateReact} />
		</Route>
	</Router>
),document.getElementById('container'));
