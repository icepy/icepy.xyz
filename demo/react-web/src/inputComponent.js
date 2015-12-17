import React from 'react';

class InputComponent extends React.Component{
	shouldComponentUpdate(){
		return true;
	}
	render(){
		let value = '毫秒：'+this.props.date.getTime();
		let style = {
			paddingTop:'10px'
		};
		return(
			<div style={style}>
				<input type="text" placeholder="table view" defaultValue={value} onChange={this.handlerChange}/>
				<p>It is {this.props.date.toTimeString()}</p>
			</div>
		);
	}
	handlerChange(event){
		this.setState({
			tableValue:event.target.value.substr(0,50)
		});
	}
}

module.exports = InputComponent;