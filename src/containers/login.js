import React,{ Component } from 'react'; 
import { Field, reduxForm } from 'redux-form'; 
import { connect } from 'react-redux';
import { submitLogin } from  '../actions';


class Login extends Component {
	/*
		constructor(props){
			super(props);

			this.state = { 
				user : '', 
				password: '' 
			}

			this.onChangeValue = this.onChangeValue.bind(this);
			this.onFormSubmit = this.onFormSubmit.bind(this);
		}

		/*onChangeValue(event){
			console.log('EV',event.target.value);
			const {name} = event.target
			this.setState({ [name] : event.target.value})
		}

		onFormSubmit(event){
			event.preventDefault();
			const formData = {};
		    for (let ref in this.refs) {
		        formData[ref] = this.refs[ref].value;
		    }
		    console.log(formData);
		    //I can do wathever I want with this object! cool!

		}
	*/

	inputFieldBuilder(field){
		//console.log('INPUT '+field.input.name+':',field);

		const {meta: {touched,error}} = field; //const touched = field.meta.touched

		const className=`form-group${touched && error ? ' has-danger' : ''}`;								

		return(
			<div className={className}>
				<label htmlFor={field.name}>{field.label}</label>
				<input
					className="input-field form-control"
					type={field.type}
					{...field.input}// questo significa assegnare al template
									// la gestione di tutti gli eventi dell'input
									// come onChange={field.input.onChange} e così via
				/>
				<div className="text-help">{touched ? error : ''}</div>
			</div>
			
		);

	}

	onFormSubmit(values){
		//console.log(values);
		
		this.props.submitLogin(values, () => {
			console.log(values)
			let {email,password} = values;
			if(email == 'azienda'){
				this.props.history.push('/azienda')
			}else if(email == 'admin'){
				this.props.history.push('/purchases')
			}else if(email == 'redattore'){
				this.props.history.push('/table/1')
			}
		});//l'action creator 'submitLogin' è una prop adesso
	}

	render(){
		//console.log('PROPS',this.props);
		const { handleSubmit } = this.props; // const handleSubmit = this.props.handleSubmit;
											 // handleSubmit è un helper di reduxForm che è 
											 // diventato una prop del componente con il bin
											 // in fondo export default reduxForm({
											 //		form: 'loginForm'
											 // })(Login)

		

		return(
			<div className="container centered login-form">
				<h1>Log in</h1>
				<form className="col-xs-12" 
				onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
					{/*<label htmlFor="user">
							USER:</label>
					<input 
							value={this.state.user}
							onChange={this.onChangeValue}
							className="input-field form-control" 
							type="text" 
							name="user" 
							ref="user" />*/}
					<Field 
						name="email"
						label="USER NAME"
						type="text"
						component={this.inputFieldBuilder}
					/>					
					{/*<label htmlFor="password">
						PASSWORD
						</label>
					<input
							value={this.state.password} 
							className="form-control"
							
							type="password" 
							name="password" 
							ref="password" />*/}
					<Field 
						name="password"
						label="USER PASWORD"
						type="password"
						component={this.inputFieldBuilder}
					/>
					<input type="submit" value="submit" className="btn btn-danger"/>
				</form>
			</div>
		);
	}
}

function validateForm(values){
	//console.log('values inside validateForm',values);

	const errors = {}; 

	if(!values.email){
		errors.email = 'il campo è obbligatorio'; //se gli errori non sono attribuiti
												  // al singolo elemento e con lo stesso
												  // nome, il validate non capisce e per 
												  // lui il form è valido
	}
	if(!values.password){
		errors.password = 'il campo è obbligatorio';
	}
	//console.log('ERRORS',errors);
	return errors;//if {errors} is empty form is submitted
}

export default reduxForm({
	validate: validateForm, //validate viene da reduxForm
	form: 'LoginForm' //può essere qualsiasi nome, basta che è univoco
})(
	connect(null,{submitLogin})(Login)
);
//questo pezzo di codice collega reduxForm al componente 
//e infine il componente all'action creator
