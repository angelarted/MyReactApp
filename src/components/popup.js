import React, { Component } from 'react';

class Popup extends Component{

	constructor(props){
		super(props);
		console.log(props.open)

		this.state={
			open: props.open
		}
	}

	handleClick(type){
		this.setState({
			open: false
		},function(){
			if(type=='yes'){
				this.props.onPopupClosed(this.state.open,true)
			}
			else{
				this.props.onPopupClosed(this.state.open,false)
			}
		});
		// il metodo che ho passato come prop viene chiamato 
		// in questo modo può effettuare azioni nel parent
	}

	render(){
		const {open} = this.props
		const status = open ? 'block':'none'
		return(
			<div className="popup-container"
				 style={{display: status,position: 'absolute'}}>
				<div className="popup-body">
					<div className="row">
						Are you sure you want to delete this purchase?
					</div>
					<div className="row button-container">
						<button onClick={this.handleClick.bind(this,'yes')}>YES</button>
						<button onClick={this.handleClick.bind(this,'no')}>NO</button>
					</div>
				</div>
			</div>
		)
	}

}

export default Popup;