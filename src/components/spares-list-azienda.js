import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';

class SparesList extends Component {

	constructor(props){
		super(props);

		//console.log(props);
	}

	renderList(list){//list è passata come prop nel parent 

		return _.map(list, (part)=>{
			
			let { hovering } = this.props.list
			//console.log('PART',part);
			return (
						
				<div key={part.id} className="row" ref={this.dragulaDecorator}>
					<div className="cell position" 
						 id={part.position}>{part.position}</div>	
					<div className="cell description">{part.description}</div>
					<div className="cell add-container">
						<button className="fa fa-minus" />
						<input type="number" />
						<button className="fa fa-plus" />
					</div>
					<div className="cell price">{part.price}</div>
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

export default SparesList;