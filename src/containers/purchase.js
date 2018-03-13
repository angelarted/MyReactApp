import React,{Component} from 'react';
import { viewPurchase } from '../actions';//!!!!!di nuovo cazzo le parentesiiiiii
import { connect } from 'react-redux';

class Purchase extends Component {

	constructor(props){
		super(props);
	}

	componentDidMount(){
		
		if(!this.props.purchases){
			const { id } = this.props.match.params;
			this.props.viewPurchase(id);
		}
		console.log('PROPS DOPO',this.props);
	}

	render(){
		//console.log('PROPS RENDER',this.props.singlePurchase);
		const {singlePurchase} = this.props;
		//console.log('SP',singlePurchase)

		if(!singlePurchase){
			return(
				<div>loading...</div>
			)
		}else{
			return(
				<div className="container tables">
					<h1 className="section-title">
					<span>Purchase n°:</span> {singlePurchase.id}</h1>
					
					Single Purchase N° {singlePurchase.id} | CLiente {singlePurchase.categories} 
				</div>
			)
		}
		
	}

}

function mapStateToProps({purchases},ownProps){
	//console.log(purchases)
	return{
		singlePurchase : purchases[ownProps.match.params.id]
	};
}

export default connect(mapStateToProps,{ viewPurchase })(Purchase);