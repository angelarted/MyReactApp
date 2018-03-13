import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'; 
import DatePicker from 'react-date-picker';
import update from 'immutability-helper';

class TableName extends Component{

	constructor(props){
		super(props)

		this.state={
			date: {
				to: new Date(),
				from: new Date()
			}
		}

		//this.onDateChange = this.onDateChange.bind(this);
	}

	onDateChange(p,date){
		//console.log(p+': '+date)
		this.setState({
        		date: update(this.state.date, {
        			[p]: {$set : date}
        		})
        },()=>{
        	//console.log(this.state.date)
        });
    }

    onSubmitHandle(){

    }

	inputFieldBuilder(field){

		return(
			<div className="input-field-container">
				<label htmlFor="input">
					{field.label}
					<input 
						name={field.name}
						className="input-field"
						type={field.type}
						{...field.input}// questo significa assegnare al template
									// la gestione di tutti gli eventi dell'input
									// come onChange={field.input.onChange} e così via
					/>
				</label>
			</div>
		)
	}

	render(){
		const {handleSubmit} = this.props;
		
		return(

			<div className="table-name-container">
				<form>
					<Field 
						label="TAVOLA N°: "
						name="table-number"
						type="text"
						component={this.inputFieldBuilder}
					/>
					<Field  
						label="NOME: "
						name="table-name"
						type="text"
						component={this.inputFieldBuilder}
					/>
					<DatePicker
					  className="input-field-container"
				      onChange={this.onDateChange.bind(this,'from')}
				      value={this.state.date.from}
				    />
				    <DatePicker
				      onChange={this.onDateChange.bind(this,'to')}
				      value={this.state.date.to}
				    />
				</form>
			</div>
		);
	}
}

export default reduxForm({ //validate viene da reduxForm
	form: 'TableNameForm' //può essere qualsiasi nome, basta che è univoco
})(connect(null)(TableName));