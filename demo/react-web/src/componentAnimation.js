import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactTransitionGroup from 'react-addons-transition-group';
import Navigation from './navigation';

const ComponentsAnimation = React.createClass({
	getInitialState(){
		return {
			items:[
				{"id":0,"name":"React"},
				{"id":1,"name":"Swift"},
				{"id":2,"name":"Objective-C"}
			]
		}
	},
	handleRemove(e,item,i){
		var newItems = this.state.items.slice();
	    newItems.splice(i, 1);
	    this.setState({items: newItems});
	},
	render(){
		let buttonStyle = {
			marginTop:'10px',
			marginBottom:'10px'
		};
		let removeStyle = {
			position:'absolute',
			right:'5px',
			top:'3px'
		};
		const items = this.state.items.map((item, i) => {
		    return (
		      <li key={item.id}>
		        {item.name}
		        <button style={removeStyle} type="button" className="am-btn am-btn-danger" onClick={this.handleRemove.bind(this, item,i)}>remove</button>
		      </li>
		    );
		});
	  	return (
	    	<div>
	    		<Navigation />
	      		<button style={buttonStyle} type="button" className="am-btn am-btn-success" onClick={this.handleAdd}>Add Item</button>
	      		<ul className="am-list am-list-static compAnimation">
	      			<ReactCSSTransitionGroup transitionName="range" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
	        			{items}
	        		</ReactCSSTransitionGroup>
	      		</ul>
	    	</div>
	  	);
	}
}); 

module.exports = ComponentsAnimation;
