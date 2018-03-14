import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Field, reduxForm } from 'redux-form'; 
import update from 'immutability-helper';

class SparesList extends Component {

	constructor(props){
		super(props);

		this.state={
			list : this.props.list
		}
		//console.log('STATE',this.state.list)
		this.onNumberChange = this.onNumberChange.bind(this);
	}

	onNumberChange(input){
		const quantity =input.target.value;
		const n = input.target.name.split('-')[1];
		this.setState({
			list : update(this.state.list,{ [n] : {$merge: { quantity }}})
		},()=>{
			//console.log(this.state.list)
			this.props.callbackOnAdd(quantity,n);
		})

		
	}
	renderField(field){
		return(
			<input type="text"
				{...field.input}
			/>
		);
	}

	renderList(list){//list è passata come prop nel parent 

		return _.map(list, (part,index)=>{

			let { hovering } = this.state.list
			let {id,position,description,quantity,price} = part;
			/*console.log('INDEX',index);
			console.log('QUANTITY',quantity);*/
			return (
						
				<div key={id} className="row" ref={this.dragulaDecorator}>
					<div className="cell position" 
						 id={position}>{position}</div>	
					<div className="cell description">{description}</div>
					<div className="cell add-container">
						<button className="fa fa-minus" />
						<Field name={`quantity-${index}`} 
							   component={this.renderField}
							   type="text"
							   value={quantity}
							   onChange={this.onNumberChange}
							   key={id}
						/>
						{quantity}
						<button className="fa fa-plus" />
					</div>
					<div className="cell price">{price}</div>
				</div>
						
			)
		});
	}

	render(){

		return(
			<form> 
				{this.renderList(this.props.list)}
				<button type="submit" className="big-button">ACQUISTA</button>
			</form>
		);

	};
}

export default reduxForm({
	form: 'PartsBuyForm' //può essere qualsiasi nome, basta che è univoco
})(SparesList);