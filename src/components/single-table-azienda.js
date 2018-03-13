import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import SparesListAzienda from './spares-list-azienda';
import update from 'immutability-helper';
//import _, { cloneDeep } from 'lodash';

class SingleTable extends Component {

	constructor(props){
		super(props);

		this.state = {
			dropped : [],
			hovering: false,
			list:{
				"0" : { 
					id:0, 
					position: 1, 
					price: 12.3, 
					description: 'blablbal balla bala',
				  	top:0 ,
				  	left:0
				},
				"1" : { 
					id:1, 
					position: 1, 
					price: 2.3, 
					description: 'blablbal balla balal',
				  	top:0 ,
				  	left:0},
				"3" : { id:2, position: 3, price: 1.3, description: 'blablbal balla balal',
				  top:0 ,left:0},
				"4" : { id:3, position: 4, price: 9.3, description: 'blablbal balla balal',
				  top:0 ,left:0},
				"5" : { id:4, position: 5, price: 4.3, description: 'blablbal balla balal',
				  top:0 ,left:0},
				"6" : { id:5, position: 5, price: 9.3, description: 'blablbal balla balal',
				  top:0 ,left:0},
				"7" : { id:6, position: 5, price: 3.3, description: 'blablbal balla balal',
				  top:0 ,left:0},
				"8" : { id:7, position: 8, price: 2.3, description: 'blablbal balla balal',
				  top:0 ,left:0},
				"9" : { id:8, position: 9, price: 23.0, description: 'blablbal balla balal',
				  top:0 ,left:0},
				"10" : { id:9, position: 10, price: 1.3, description: 'blablbal balla balal',
				  top:0 ,left:0},
			}
			
		}

	}

	renderDropped(){
		//console.log('STATE dropped',this.state.dropped);
		return this.state.dropped.map((pos)=>{
			return (
				<div key={Math.floor(Math.random()*1000)} className="position-dropped"
					data-id={pos.id}
					style={{top:pos.top,left: pos.left}}
				>{pos.id}</div>
			);
		})
	}

	/********
	* callback definita nel parent che riceve i parametri nel child
	*********/
	onChildChanged(top,left,id){

        console.log('T L I',top,left,id);

        this.setState({
        		/***
        		*list: update(this.state.list, {[id]: {$merge: {top, left}}}),//come aggiornare
        		* 												//solo una proprietà in uno state 
        		*                                               //molto nested
        		***/
        		dropped : update(this.state.dropped, {$push: [{id,top,left}]})
        											 // quando fai il push di un un array
        											 // devi wrappare il valore tra []
        	}, () => {
        		this.renderDropped();//callback dopo aver aggiornato lo state
        	});
			console.log(this.state.list[id]);
	}

	render(){
		return(
			<div className="active-area-container">
				<div className="table-img-container col-xs-7" id="img-container">
					{this.renderDropped()}
				</div>
				<div className="spare-parts-list-container col-xs-5 azienda">
					<SparesListAzienda list={this.state.list} 
					callbackOnDrop={(top,left,id)=>this.onChildChanged(top,left,id)} />
				</div>
			</div>
		)
	}
	
}

export default SingleTable;