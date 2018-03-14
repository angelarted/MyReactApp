import { GET_ARTICLES, SINGLE_ARTICLE } from '../actions'; //qui importo solo la stringa del 'type'
import _ from 'lodash';

export default function(state = {},action){
	switch (action.type){

		case GET_ARTICLES:
			//qui devo ritornare i miei dati come oggetto
			//console.log('ARTICLES INSIDE REDUCER',action.payload.data.data)
			return _.mapKeys(action.payload.data.data,'id');
			break;
		case SINGLE_ARTICLE:
			//console.log('STATE DIRECT LOAD',state)
			const article = action.payload.data.data;
			const newState = {...state}
			//console.log('SPREADED',newState)
			newState[article.id] = article;
			
			return newState;
			break;
		default:
			return state;
	}
}