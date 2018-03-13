import React, { Component } from 'react';
import SparesList from './spares-list';
import { Droppable } from 'react-drag-and-drop';
import update from 'immutability-helper';
import _, { cloneDeep } from 'lodash';

class SingleTable extends Component {

	constructor(props){
		super(props);

		this.state = {
			dropped : [],
			hovering: false,
			list:{
				"0" : { id:0, position: 1, price: 12.3, description: 'blablbal balla bala',
				  top:0 ,left:0},
				"1" : { id:1, position: 1, price: 2.3, description: 'blablbal balla balal',
				  top:0 ,left:0},
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
		console.log('STATE renderDropped',this.state.list[4])
		return this.state.dropped.map((pos)=>{
			return (
				<div key={pos} className="position-dropped"
					data-id={pos}
					style={{top:this.state.list[pos].top,
							left: this.state.list[pos].left
						   }}
				>{pos}</div>
			);
		})
	}

	/********
	* callback definita nel parent che riceve i parametri nel child
	*********/
	onChildChanged(top,left,id){
		
        const list = update(this.state.list, {[id]: {$merge: {top, left}}});    

        this.setState({list}, () => {
        	console.log('STATE onChildChanged',this.state.list[id],id);
        	this.renderDropped();
        });

		//
	}

	onDrop(data) {
        //console.log('DATA ',data);//e questo data da dove arriva?
        	// il 'data' gli viene passato nel wrapper 'Draggable' - 'position' è la chiave che
        	// mette lui a seconda del type passato come draggable  
        this.setState({ 
        	dropped: this.state.dropped.concat(data.position) 
        })
    }

	render(){
		console.log('render')
		return(
			<div className="active-area-container">
				<Droppable className="col-xs-7" types={['position']}
						   onDrop={this.onDrop.bind(this)}>
					<div className="table-img-container">
						{this.renderDropped()}
					</div>
				</Droppable>
				<div className="spare-parts-list-container col-xs-5">
					<SparesList list={this.state.list} 
					callbackOnDrop={(top,left,id)=>this.onChildChanged(top,left,id)} />
				</div>
			</div>
		)
	}

	
	
}

export default SingleTable;