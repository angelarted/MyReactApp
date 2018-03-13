import React from 'react';

const SingleSlide = (props)=>{
	
	return (
		<div>
			<h3 className={`slick-slide slide-${props.id}`}>{props.title}</h3>
		</div>
	)
}

export default SingleSlide;