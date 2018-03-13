import { SINGLE_ARTICLE } from '../actions';

// state argument id not application state, only the state
// this reducer is responsible for
export default function(state=null,action){
	switch (action.type){

		case SINGLE_ARTICLE:
			console.log('request dentro al REDUCER',action);
			return action.payload.data.data

		default:
			return state
	}
}


/******
* Un reducer è una funzione che produce un valore per un certo state
* la mappatura chiave-valore di state: reducer viene fatto nell'index.js
* della cartella reducers. 
* Il reducer riceve l'oggetto prodotto dall'action creator e a seconda
* del type restituisce pezzi di 'state' aggiornati
* quando lo state si modifica l'app (o meglio il singolo componente)
* vengono ri-renderizzati 
*******/