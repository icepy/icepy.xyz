import React from 'react';
import Navigation from './navigation';

class DateHelper{
	dateToString(){
		let date = new Date();
		let dateString = '';
		dateString += date.getFullYear()+'年-'+(date.getMonth()+1)+'月-'+date.getDate()+'日-';
		dateString += date.getHours()+'时-'+date.getMinutes()+'分-'+date.getSeconds()+'秒';
		return dateString;
	}
}
let dateHelper = new DateHelper();
const DateReact = React.createClass({
	getInitialState(){
		return{
			"dateString":null
		};
	},
	render(){
		let dateString = '';
		if (this.state.dateString) {
			dateString = this.state.dateString;
		};
		let style = {
			"marginTop":"20px"
		};
		var pStyle = {
			"paddingTop":"5px"
		};
		return(
			<div className="am-container">
				<Navigation/>
				<button style={style} type="button" className="am-btn am-btn-warning" onClick={this.onDateClickHandler}>获取当前时间</button>
				<p style={pStyle}>{dateString}</p>
			</div>
		);
	},
	onDateClickHandler(e){
		var dateString = dateHelper.dateToString();
		this.setState({
			dateString:dateString
		});
	}
});
module.exports = DateReact;