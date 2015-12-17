import React from 'react';
import Navigation from './navigation';

const InboxList = React.createClass({
	render(){
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
	handleClick(e,i){
		console.log(e);
		console.log(i);
	}
});

const Inbox = React.createClass({
	getInitialState(){
		return{
			inboxInfo:['icepy','wower','books']
		};
	},
	render(){
		return (
			<div className="am-container">
				<InboxList inboxInfo={this.state.inboxInfo}/>
			</div>
		);
	}
});

module.exports = Inbox;