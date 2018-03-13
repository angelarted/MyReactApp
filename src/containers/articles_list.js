import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getArticles } from '../actions';
import { Link } from 'react-router-dom';

class ArticlesList extends Component{
	
	constructor(props){
		super(props);
		
	}

	componentDidMount(){
		this.props.getArticles();
		//console.log('1',this.props.articles);
		//forse qui dentro è vuoto perchè ancora il componente non è stato montato??? YEP!
	}

	renderArticles(){
		return(
			_.map(this.props.articles,article =>{
				return (
					<div className="article" key={article.id}>
						<Link to={`/azienda/table/${article.id}`}>{article.name}, {article.year}</Link>
					</div>
				)
			})
			
		)
	}

	render(){
		//console.log('2',this.props.articles); //infatti qui adesso funziona
		return(
			<div className="articlewrap">
				{this.renderArticles()}
			</div>
		);
	};
}

function mapStateToProps(state){
	return { articles : state.articles }
}

export default connect(mapStateToProps,{ getArticles})(ArticlesList);