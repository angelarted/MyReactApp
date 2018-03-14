import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSingleArticle } from '../actions'; /**** CAZZZOOOO!!! LE PARENTESI!!! ****/
import SimpleSlider from '../components/slider';
import SingleTableAzienda from '../components/single-table-azienda';

//console.log(getSingleArticle)
class Table extends Component{

	constructor(props){
		super(props)
	}

	componentDidMount(){

		if(!this.props.myArticle){ //se non vogliamo che ogni volta che si accede a
								   //un post si rifaccia la chiamata, se quello è già
								   //stato fetchato
			const { id } = this.props.match.params;
			//console.log(id);
			this.props.getSingleArticle(id);
		}
		
	}

	render(){
		//console.log('PROPS',this.props);

		const { myArticle } = this.props;
		//console.log(myArticle);

		const slides = [
			{ id: 1, title:'Table 1 - (up to 30/11/2015)' },
			{ id: 2, title:'Table 1 - (from 01/12/2015 )' },
			{ id: 3, title:'Table 2 - (up to 18/03/2013)' },
			{ id: 4, title:'Table 2 - (from 19/03/2013 )' },
			{ id: 5, title:'Table 3 - (from 29/01/2014)' },
			{ id: 6, title:'Table 4' },
			{ id: 7, title:'Table 5' },
		]

		if(!myArticle)	{//la prima volta che carico questo component non c'è myArticle
			return (
				<div className="container">
					<div>...loading data</div>
				</div>
			);
		}							  

		//const myArticle = this.props.articles[this.props.match.params.id];
		return(
			<div className="container tables">
				<h1 className="section-title"><span>{myArticle.id}:</span> {myArticle.name}</h1>
				
				<SimpleSlider slides={slides} />
				<SingleTableAzienda history={this.props.history} />
			</div>
		);
	};

}

function mapStateToProps({ articles },ownProps){
	// importiamo solo il pezzo di state che ci interessa
	// ownProps sono le prop attaccate al componente (this.props)
	/* console.log('ARTICLES INSIDE mapStateToProps',{articles}); */
	// whatever is returned here will be a prop inside Table component
	// ancora una volta il key è arbitrario, ma il value deve corrispondere
	// a qualche 'key' tra gli 'states' definiti dentro il combineReducers
	return { myArticle : articles[ownProps.match.params.id]}; //faccio qui l'operazione che 
															//prima facevo dentro render()
	//return { articles }; in questo modo sono attaccati al component tutti i post
}

// Anything returned from this function will end up as props
// del 'Table' component, con il nome indicato come key nell'oggetto
// ritornato dentro 'bindActionCreators' (prop.selArticle) LO POSSO CHIAMARE COME VOGLIO
/*function mapDispatchToProps(dispatch){
	// whenever getSingleArticle is called, the result should be passed
	// to all of our reducers. 'dispatch' è la funzione che fa questo
	// 'dispaccha' l'action a tutti i reducers
	return bindActionCreators({ selArticle: getSingleArticle}, dispatch);
}*/

export default connect(mapStateToProps,{ getSingleArticle })(Table); 

/*********
* nel component per collegare gli state con il compenente (ossia Redux con React)
* si importa l'helper 'connect' dalla libreria 'react-redux',
* si definsce mapStateToProps, con cui si aggiunge lo state come prop del component
* infine si esporta il component non come se steeso ma come connessione tra i due
* si può anche mettere null come primo argomento se il componente non tiene conto 
* di alcuno state
**********/
