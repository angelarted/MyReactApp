import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPurchases } from '../actions';
import { deletePurchase } from '../actions';
import Popup from '../components/popup';

class PurchaseList extends Component{

	constructor(props){
		super(props);

		this.state = {
			open : false,
			id : 0
		}
	}

	manipulatePurchase(id,type,event){
		console.log(type);
		console.log(id)
		//console.log('PROPS',this.props)
		//qui dentro l'laltra action creator per il delete o il view del singolo purchase
		if(type=='delete'){

			this.setState({
				open : !this.state.open,
				id : id
			},function(){
				//console.log(this.state.open);
				//this.props.deletePurchase(this.state.id)
			});
		}else if(type='view'){
			this.props.history.push('/purchases/'+id);//go to selected post
		}else{
			alert('no type specified');
		}
	}

	callbackAfterClose(newState,del){
		//console.log('popup closed',newState);
		
		this.setState({
			open: newState
		},function(){
			if(del == true){
				this.props.deletePurchase(this.state.id)
			}else{return false}
			
		});//quando la popup viene chiusa invoco la 
									  //funzia che elimina la riga
	}

	componentDidMount(){
		// gli action creator, appunto, sono creatori di azioni, quindi di solito vengono 
		// chiamati allo scatenarsi di qualche azione (click, change, over, drop..!!) 
		// qui lo chiamo al didMount, per avere la lista delle compere su cui costruire 
		// la vista. Ora la mia action creator è una prop grazie al mapState to props
		//console.log('PROPS PRIMA',this.props)
		this.props.getPurchases(); 
		// ora che ho chiamato l'action creator, la mia azione verrà passata a tutti i reducer
		// e in base al type restituirà il pezzo di state che mi serve
		// ehhhh!!! yes! yes! yes!!
	}

	renderList(){
		let {purchases} = this.props;
		//console.log('P',purchases)
		return _.map(purchases,(purchase)=>{
			const {id,categories,title,content} = purchase;
			return (
				<div key={id} className="row {purchase.mode}">
					<div className="cell codice">{id}</div>
					<div className="cell ragione">{categories}</div>
					<div className="cell data">{title}</div>
					<div className="cell numero">{content}</div>
					<div className="buttons-container">
						<button className="delete fa fa-trash"
							onClick={this.manipulatePurchase.bind(this,id,'delete')}></button>
						<button className="view fa fa-search" 
							onClick={this.manipulatePurchase.bind(this,id,'view')} ></button>
					</div>
				</div>
			)
		})
	}

	render(){
		//console.log('PROPS DOPO',this.props.purchases)//Qui ce l'ho disponibile perchè 
		 						  //l'action creator getPurchases è già stato chiamato
		return(
			<div className="container admin">
				<h1>Purchase List</h1>
				<div className="main-content-container">
					<div className="spare-parts-list-container">
						<div className="header-container row">
							<div className="cell codice">CODICE</div>
							<div className="cell ragione">RAGIONE SOCIALE</div>
							<div className="cell data">DATA</div>
							<div className="cell numero">NUMERO ORDINE</div>
						</div>
						<div className="force-overflow">
							{this.renderList()}
						</div>
					</div>
				</div>
				<Popup open={this.state.open} onPopupClosed={ (newState,del) => this.callbackAfterClose(newState,del)} />
				{/* passo un metodo come prop al child | mi scordo sempre delle espressioni in linea */}
			</div>
		)
	}
} 

function mapStateToProps(state){
	//console.log('STATE INSIDE PURCHASE MtoP',state.purchases);
	return{ 
		purchases : state.purchases
	}
}

export default connect(mapStateToProps,{getPurchases,deletePurchase})(PurchaseList);