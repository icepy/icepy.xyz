import React from 'react';
import ReactDOM from 'react-dom';
import ReactTransitionGroup from 'react-addons-transition-group';

const LowLevelAnimation = React.createClass({
	componentDidMount(){
		console.log(this.props)
	},
	componentWillUnmount(){

	},
	componentWillAppear(callback){
		console.log(this)
	},
	componentDidAppear(){
		console.log(this);
	},
	componentWillEnter(callback){
		console.log(10);
	},
	componentDidEnter(){
		console.log(789)
	},
	componentWillLeave(callback){
		console.log(456)
	},
	componentDidLeave(){
		console.log(123)
	},
	transition(){
		console.log('qwe');
		var node = ReactDOM.findDOMNode(this);
	},
	render(){
		return (
			<ReactTransitionGroup component="div" className="animated-list">
				{this.props.children}
			</ReactTransitionGroup>
		);
	}
});

module.exports = LowLevelAnimation;