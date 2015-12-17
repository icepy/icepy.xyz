import React from 'react';
import InputComponent from './InputComponent';
import Navigation from './navigation';

const AboutMe = React.createClass({
	render(){
		let style = {
			color:'red',
			fontSize:'12px'
		};
		return (
			<div className="am-container" style={style}>
				<InputComponent date={new Date()}/>
			</div>
		);
	}
});

const About = React.createClass({
	render(){
		return (
			<div className="am-container">
				<Navigation/>
				<AboutMe/>
			</div>
		);
	}
});

module.exports = About; 