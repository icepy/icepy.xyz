import React from 'react';
import Navigation from './navigation';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

console.log(ReactCSSTransitionGroup);

const InboxList = React.createClass({
	render(){
		let inboxInfo = this.props.inboxInfo.map((info,i)=>{
			return (
				<li key={("_"+info)} onClick={this.handleClick.bind(this,i)}>
					{info}
				</li>
			);
		});
		let style = {
			color:'red',
			fontSize:'12px'
		};
		return(
			<div style={style}>
				<ul className="am-list am-list-static">
					{inboxInfo}
				</ul>
			</div>
		);
	},
	handleClick(e,i){
		console.log(e.clientX);
		console.log(i);
	}
});
var addIndex = 0;
const Inbox = React.createClass({
	getDefaultProps(){
		return {
			inboxDefault:'wower'
		};
	},
	getInitialState(){
		return{
			inboxInfo:['icepy','wower','books']
		};
	},
	render(){
		let buttonStyle = {
			marginTop:'10px',
			marginBottom:'10px'
		};
		return (
			<div className="am-container icepy" onClick={this.icepyEvents}>
				<Navigation/>
				<button style={buttonStyle} type="button" className="am-btn am-btn-success" onClick={this.addOnceList.bind(this,buttonStyle)}>add</button>
				<button style={buttonStyle} type="button" className="am-btn am-btn-danger" onClick={this.removeOnceList}>remove</button>
				<InboxList inboxInfo={this.state.inboxInfo}/>
			</div>
		);
	},
	addOnceList(p,e){
		console.log(e);
		console.log(p);
		e.stopPropagation();
		e.preventDefault();
		let items = this.state.inboxInfo;
		items.push('style'+addIndex++);
		this.setState({
			inboxInfo:items
		});
	},
	removeOnceList(e){
		let items = this.state.inboxInfo;
		console.log(this)
		items.pop();
		this.setState({
			inboxInfo:items
		});
	},
	icepyEvents(e){
		console.log('事件传播');
	}	
});

module.exports = Inbox;