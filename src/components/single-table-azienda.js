import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import SparesListAzienda from './spares-list-azienda';
import update from 'immutability-helper';
//import _, { cloneDeep } from 'lodash';

class SingleTable extends Component {

	constructor(props){
		super(props);
		
		this.state = {
			bought : [],
			hovering: false,
			list:{
				"0" : { 
					id:0, 
					position: 1, 
					price: 12.3,
					quantity: 0,
					description: 'bla blbal balla bala',
				  	top:0 ,
				  	left:0
				},
				"1" : { 
					id:1, 
					position: 1, 
					price: 2.3, 
					quantity: 0,
					description: 'bla blbal balla balal',
				  	top:0 ,
				  	left:0
				},
				"3" : { id:2, 
					position: 3, 
					price: 1.3, 
					quantity: 0,
					description: 'bla blbal balla balal',
				  	top:0 ,
				  	left:0
				},
				"4" : { 
					id:3, 
					position: 4, 
					price: 9.3, 
					quantity: 0,
					description: 'bla blbal balla balal',
				  	top:0 ,
				  	left:0
				},
				"5" : { 
					id:4, 
					position: 5, 
					price: 4.3, 
					quantity: 0,
					description: 'bla blbal balla balal',
				  	top:0 ,
				  	left:0
				},
				"6" : { 
					id:5, 
					position: 5, 
					price: 9.3, 
					quantity: 0,
					description: 'bla blbal balla balal',
				  	top:0 ,
				  	left:0
				},
				"7" : { 
					id:6, 
					position: 5, 
					price: 3.3,
					quantity: 0,
					description: 'bla blbal balla balal',
				  	top:0 ,
				  	left:0
				},
				"8" : { 
					id:7, 
					position: 8, 
					price: 2.3, 
					quantity: 0,
					description: 'bla blbal balla balal',
				  	top:0 ,
				  	left:0
				},
				"9" : { 
					id:8, 
					position: 9, 
					price: 23.0, 
					quantity: 0,
					description: 'bla blbal balla balal',
				  	top:0 ,
				  	left:0
				 },
				"10" : { 
					id:9, 
					position: 10, 
					price: 1.3, 
					quantity: 0,
					description: 'bla blbal balla balal',
				  	top:0 ,
				  	left:0
				},
			}
			
		}

	}

	onProdAdded(quantity,id){
		console.log('onProdAdded',quantity+' '+id);
		//qui definivo cosa?? mi so già scordata
	}

	/********
	* callback definita nel parent che riceve i parametri nel child
	*********/
	onChildChanged(quantity,id){ 

        /*console.log('NUMBER',quantity);
        console.log('ID',id);
        console.log('OBJ',this.state.list);*/
        this.setState({
        		list : update(this.state.list, { [id]: {$merge: { quantity }}})
        	},() => {
        		this.onProdAdded(quantity,id);//callback dopo aver aggiornato lo state
        	});
			//console.log(this.state.list);
	}

	render(){
		return(
			<div className="active-area-container">
				<div className="table-img-container col-xs-7" id="img-container">
					
				</div>
				<div className="spare-parts-list-container col-xs-5 azienda">
					<SparesListAzienda list={this.state.list} 
					callbackOnAdd={(number,id)=>this.onChildChanged(number,id)}
					history={this.props.history} />
				</div>
			</div>
		)
	}
	
}

export default SingleTable;