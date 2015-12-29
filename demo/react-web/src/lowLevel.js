import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactTransitionGroup from 'react-addons-transition-group';
import Navigation from './navigation'
import LowLevelAnimation from './lowLevelAnimation'

const Slide = React.createClass({
	getDefaultProps(){
		return{
			images:[
				'./img/01.jpg',
				'./img/02.jpg',
				'./img/03.jpg'
			],
			imageSrc:'./img/01.jpg'
		};
	},
	getInitialState(){
		return {
			items:[
				{"id":0,"name":"Class"},
				{"id":1,"name":"Children"},
				{"id":2,"name":"Component"}
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
		return(
			<div className="transition">
				<Navigation/>
				<ul className="am-list am-list-static">
					<LowLevelAnimation animationClassName="lowLevel">
						{items}
					</LowLevelAnimation>
				</ul>
			</div>
		);
	}
});

module.exports = Slide;