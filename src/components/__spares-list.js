import React, { Component } from 'react';
import { Draggable } from 'react-drag-and-drop'


class SparesList extends Component {

	constructor(props){
		super(props);

		this.onDragStart = this.onDragStart.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);

	}

	onDragStart(e){
		/*console.log('start drag',e.target.id)
		
		this.setState({
			hovering: true
		});*/
	}

	onDragEnd(e){	
		let { id,offsetTop,offsetLeft } = e.target
		/*const list = this.props.list;
		console.log('TOP prima',list[id].top);
		console.log('LEFT prima',list[id].left);*/
		
		/*list[id].top = offsetTop;
		list[id].left = offsetLeft;
		console.log('TOP dopo',list[id].top);
		console.log('LEFT dopo',list[id].left);*/
		/**********
		* callback attivata nel child
		**********/
		this.props.callbackOnDrop(offsetTop,offsetLeft,id);
	}

	renderList(list){

		return _.map(list, (part)=>{
			//console.log('PART',part);
			
			let { hovering } = this.props.list
			//console.log('PART',part);
			return (
						
				<div key={part.id} className="row">
					<Draggable type="position" 
						id={part.id} 
						data={part.position}	
						enabled={1===1} /*qualcosa per validare il droppable*/ 
						onDragStart={this.onDragStart}
						onDragEnd={this.onDragEnd}
						>
						<div className="cell position" style={{top:part.top,left:part.left}}>{part.position}</div>
					</Draggable>
					<div className="cell description">{part.description}</div>
					<div className="cell price">{part.price}</div>
				</div>
						
			)
		});
	}

	render(){

		return(
			<div> 
				{this.renderList(this.props.list)}
			</div>
		);
	};
}

export default SparesList;