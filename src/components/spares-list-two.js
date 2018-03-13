import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import Dragula from 'react-dragula';

class SparesList extends Component {

	constructor(props){
		super(props);

		//console.log(props);

		this.dragulaDecorator = this.dragulaDecorator.bind(this);
	}

	dragulaDecorator(container){
		const {props} = this;
		
		if(container){
			//console.log('CBI',container);
			/*************************/
			/* opzioni di dragula.js */
			/*************************/
			let options = { 
      			moves: function(el,source,handle,sibling){
      				return el.classList.contains('position') ? true : false ;
      			},
      			copy: true,
      			direction: 'horizontal'
      		};
      		var drake = Dragula([container], options);
      		
      		drake.on('drop',function(el,target,source,siblings){
      			var {top,left} = document.querySelector('.gu-mirror').getBoundingClientRect();
      			top = top - 318;
      			left = left - 107;
      			props.callbackOnDrop(top,left,el.id);//questa è la funzione
      			//passata come prop nel parent (vedi 'single-table-two.js')
      		});

		}
	}

	/******
	* GIRO: al drop di dragula io prendo le coordinate del mirror che viene trascinato
	* sopra il container, le passo nella callback che viene eseguita nel parent (onChildChanged)
	* una volta arrivata lì, la callback fa l'update dello state.dropped, e lancia il 
	* renderDrop, usa il top e il left appena scritti nello state.dropped
	* vedi: https://www.ctheu.com/2015/02/12/how-to-communicate-between-react-components/
	*****/

	renderList(list){//list è passata come prop nel parent 

		return _.map(list, (part)=>{
			
			let { hovering } = this.props.list
			//console.log('PART',part);
			return (
						
				<div key={part.id} className="row" ref={this.dragulaDecorator}>
					<div className="cell position" 
						 id={part.position}
						 style={{top: part.top,left: part.left}}>{part.position}</div>	
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