import React, { Component } from 'react';
import ArticlesList from '../containers/articles_list';

class Section extends Component {

	constructor(props){
		super(props);
		
		this.state = {
			open: false
		}
		
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick(){

		this.setState({
			open: !this.state.open
		});
	    /*if(this.state.open) {
	    	this.setState({
	    		open: false
	    	});
	    }else{
	    	this.setState({
	  			open: true
	    	});
	    }*/
  	}

  	render() {
	    return (
		    <div className={this.state.open ? 'section open' : 'section'}>
		        <button>toggle</button>
		        <div className="sectionhead" onClick={this.handleClick}>
		        	{this.props.title}
		        </div>
		        
		        {this.props.children}
		        	
		    </div>
	    );
	}
}

class Accordion extends Component{
  	render() {
    	return (
    		<div className="main">
        		<Section title="Professional Machines">
        			<ArticlesList />
        		</Section>
        		<Section title="Semiprofessional Machines">
        			<ArticlesList />
        		</Section>
        		<Section title="Grinders">
        			<ArticlesList />
        		</Section>
      		</div>
    	);
  	}
};

export default Accordion;