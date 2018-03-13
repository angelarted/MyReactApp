// se non ho capito male il reducer trasforma i miei dati in states. YEP!!! è cosi!

import _ from 'lodash';
import { GET_PRODS } from '../actions';

export default function(state = {},action){
	switch(action.type){
		case GET_PRODS:
			//console.log('PRODS INDIDE REDUCER ',action);
			return _.mapKeys(action.payload.data.data, 'id');
			/*return state;
					// anche qui avevo fatto sta cazzata!!! certo che se ritorno state
					// che è un oggetto vuoto di default che minchia voglio farci???!!!
			*/

			/****
			* se il payload dovesse ritornare uno state, perchè io sto attribuendo i 
			* valori ritornati dall'action creator a uno state, dobbiamo ritornare
			* qualcosa tipo state.concat(something.something) [non push] oppure
			* oppure in ES6 [something.something, ...state] SE LO STATE FOSSE UN ARRAY
			****/
		default:
			return state;
	}
}