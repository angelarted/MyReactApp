import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProds } from  '../actions';
import SingleProduct from '../components/single_product';
import _ from 'lodash';


//console.log(getProds)
class ProductList extends Component {

	constructor(props){
		super(props);
	}

	componentDidMount(){
		// qui dentro dobbiamo chiamare l'action creator getProds per avere 
		// la lista di prods nelle props
		this.props.getProds();
	}

	renderProds(){
		console.log('PRODS',this.props.prods)
		return _.map(this.props.prods, (prod) => { //uso _.map perchè lavora con gli oggetti
			return (
				<div key={prod.id}>
					<SingleProduct prod={prod} />
				</div>
			);
		});
	}

	render(){
		//console.log('PRODS',this.props.prods)
		return(
			<div className="force-overflow">
				{this.renderProds()}
			</div>
		);

	}

}

function mapStateToProps(state){
	return { prods : state.prods }
}

export default connect(mapStateToProps,{ getProds })(ProductList); 
					// in questo modo abbiamo accesso all'action 'getProds' come prop
					// del nostro componente ('null' come primo argomento)
					// ma ci facciamo poco fino a che non definiamo 'mapStateToProps'
					// e lo sostituiamo come primo argomento al posto di 'null'
