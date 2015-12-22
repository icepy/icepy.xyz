import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Navigation from './navigation';

const DefaultAnimation = React.createClass({
	getInitialState(){
		return {
			items:[
				{"id":0,"name":"icepy"},
				{"id":1,"name":"wen"},
				{"id":2,"name":"xiang"}
			]
		}
	},
	handleRemove(item) {
	  	const { items } = this.state;
	  	const len = items.length;
	  	items.forEach((v)=>{
  			if (item.id === v.id) {
  				v.isRemoving = true;
  			};
  		});
	  	this.setState({
	  		items:items
	  	});
	 	// setTimeout(() => {
		 //    this.setState({
		 //        items: items.reduce((result, entry) => {
		 //          return entry.id === item.id ? result : [...result, item];
		 //        }, [])
		 //    });
	  //   }, 500);
	},
	handleAdd(){

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
		      <li key={item.id}  className={item.isRemoving ? 'removing-item' : ''}>
		        {item.name}
		        <button style={removeStyle} type="button" className="am-btn am-btn-danger" onClick={this.handleRemove.bind(this, item)}>remove</button>
		      </li>
		    );
		});
	  	return (
	    	<div>
	    		<Navigation />
	      		<button style={buttonStyle} type="button" className="am-btn am-btn-success" onClick={this.handleAdd}>Add Item</button>
	      		<ul className="am-list am-list-static">
	        		{items}
	      		</ul>
	    	</div>
	  	);
	}
});

module.exports = DefaultAnimation;