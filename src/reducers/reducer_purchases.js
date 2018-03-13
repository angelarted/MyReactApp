import _ from 'lodash';
import { GET_PURCHASES } from '../actions';
import { DELETE_PURCHASE } from '../actions';
import { SINGLE_PURCHASE } from '../actions'
import update from 'immutability-helper';

// quindi se non sbagliio tutti i reducer di questo file producono come risultato il 
// pezzo di stato chiamato purchases....
// no, non sbagliavo. Qualsiasi cosa ritorni questa funzione, in qualsiasi 'case' 
// dello switch ci troviamo (quindi qualsiasi sia l'action creatore che manda l'azione)
// ciò che viene ritornato va a modificare lo state associato nel combineReducers 
export default function(state={},action){

	switch (action.type){
		case GET_PURCHASES:
			//console.log('STATE INSIDE REDUCER',action.payload.data);
			return _.mapKeys(action.payload.data,function(value,key,objecy){
				return value.id
			});
			//ancora, mapKeys ritorna un oggetto le cui keys sono il valore di ritorno
			// e i valori tutto il valore del
		break;
		case DELETE_PURCHASE:
			// mii che fatica!!! Per trovare la key del valore dello state eliminato
			// e poi poterlo eliminare da vecchio state, ma senza alterarlo... 
			// https://stackoverflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value
			var key = _.findKey(state,action.payload.data);
			let newState = _.omit(state, key);
			return newState;
		break;
		case SINGLE_PURCHASE:
			/*console.log('S',state);
			console.log('A',action.payload.data);*/
			let singlePurchase = action.payload.data;
			var purchases = {...state};
			//console.log('PURCHASES',purchases);
			purchases[action.payload.data.id] = singlePurchase;
			//console.log('STATE DOPO',state)
			return purchases;  
 		break;
		default:
			return state
	}
	return  state
}
