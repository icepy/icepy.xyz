import React from 'react';

class InputComponent extends React.Component{
	constructor(){
		super();
		this.state = {
			'indexDB':'v0.0.1'
		};
		this.inputIndex = 0;
	}
	
	shouldComponentUpdate(){
		return true;
	}

	componentDidMount(){
		console.log('InputComponent');
	}

	render(){
		let value = '毫秒：'+this.props.date.getTime();
		let style = {
			paddingTop:'10px'
		};
		let buttonTop = {
			marginTop:'10px'
		};
		return(
			<div style={style}>
				{/*输入框*/}
				<input type="text" placeholder="table view" defaultValue={value} onChange={this.handlerChange}/>
				<p>It is {this.props.date.toTimeString()}</p>
				<p>indexDB {this.state.indexDB}</p>
				<p ref="myIndexCoding">indexCoding {InputComponent.props.indexCoding}</p>
				<button style={buttonTop} type="button" className="am-btn am-btn-warning" onClick={this.fetchIndexCodingVersion.bind(this,event)}>获取 IndexCoding</button>
			</div>
		);
	}

	handlerChange(event){
		this.setState({
			tableValue:event.target.value.substr(0,50),
			indexDB:'v0.0.'+this.inputIndex++
		});
	}

	fetchIndexCodingVersion(event){
		let myIndexCoding = this.refs.myIndexCoding;
		console.log(myIndexCoding);
	}

};
InputComponent.props = {
	'indexCoding':'v0.0.2'
};
module.exports = InputComponent;