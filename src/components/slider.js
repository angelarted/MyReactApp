import React, { Component } from 'react';
import Slider from 'react-slick';
import SingleSlide from './single-slide';

class SimpleSlider extends Component{

	constructor(props){
		super(props);
		//console.log('slider props',props)
		this.renderSlides = this.renderSlides.bind(this);
	}

	renderSlides(slides){
		
		return slides.map((slide)=>{
			//il key va messo a questo livello non dentro il component richiamato
			return (
				<SingleSlide key={slide.id} title={slide.title} id={slide.id} />
			)
		});
	}

	render() {

	  	const settings = {
	    	dots: true,
	    	speed: 500,
	    	slidesToShow: 3,
	    	slidesToScroll: 1,
	    	infinite: false,
	    	dots: false
	    	//variableWidth: true
	    };

	    return (
	    	<Slider {...settings}>
	    		{this.renderSlides(this.props.slides)}
	      	</Slider>
	    );
	  
	}
	
}

export default SimpleSlider;