import React from 'react';


export default function(props){
	//console.log(props.prod.id);
	return(
		<div className="product-item">
			<div className="image" style={{backgroundColor:props.prod.color}}></div>
			<h5>{props.prod.name}</h5>
		</div>
	);
}

//simple functional component