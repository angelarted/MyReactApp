/***** 
* questo è il file degli action creator, che sono funzioni che ritornano oggetti
* l'oggetto ritornato è automaticamente inviato a TUTTI i reducers e filtrato dal
* type presente nell'oggetto ritornato. Il reducer a quel punto ritorna differenti 
* parti dello 'state'. 
*****/

import axios from 'axios';

export const USER_LOGIN = 'user_login';
export const GET_PRODS  = 'get_prods';
export const GET_ARTICLES = 'get_articles';
export const SINGLE_ARTICLE = 'single_article';
export const GET_PURCHASES = 'purchases_list';
export const DELETE_PURCHASE = 'delete_purchase';
export const SINGLE_PURCHASE = 'single-purchase';

const ROOT_URL = 'https://reqres.in/api/'; //sto usando questo simulatore di richieste REST disponibile online free: https://reqres.in
const UNIQUE_KEY='?key=345tghjuu5';
const PURCHASE_ROOT_URL = `http://reduxblog.herokuapp.com/api/posts`;//http://www.mocky.io

export function submitLogin(values, callback){

	const request = axios.post(`${ROOT_URL}login`, values)
	.then(() => callback())
	.catch(() => { console.log('errore') })

	return {
		type: USER_LOGIN,
		payload: request
	};
}

export function getProds(){

	const request = axios.get(`${ROOT_URL}prods`);

	return{
		type: GET_PRODS,
		payload: request
	};

}

export function getArticles(){

	const request = axios.get(`${ROOT_URL}articles`);

	return{
		type: GET_ARTICLES,
		payload: request // payload è un naming convenzionale, non è richiesto da redux
						 // FALSOOOOOOO!!!!! perlomeno con il middleware redux-promise
						 // se non scrivi corretto, non funziona!
	};
}

/* differenti action creator, stesso reducer, perchè fanno parte dello state piece of state */ 
export function getSingleArticle(id){
	//console.log('ID: ',id)
	const request = axios.get(`${ROOT_URL}aticles/${id}`);
	
	//console.log('action SA dentro ACTION CREATOR',request)

	return{
		type: SINGLE_ARTICLE,
		payload: request
	};

}

export function getPurchases(){
	const request = axios.get(`${PURCHASE_ROOT_URL}${UNIQUE_KEY}`);

	return{
		type: GET_PURCHASES,
		payload: request
	}
}

export function deletePurchase(id){
	const request = axios.delete(`${PURCHASE_ROOT_URL}/${id}${UNIQUE_KEY}`);

	return {
		type: DELETE_PURCHASE,
		payload: request
	}
}   

export function viewPurchase(id){
	const request = axios.get(`${PURCHASE_ROOT_URL}/${id}${UNIQUE_KEY}`);

	return {
		type: SINGLE_PURCHASE,
		payload: request
	}
}


// l'helper che abbiamo aggiunto come middleware 'promise' (nella index.js globale) 
// risolve immediatamente le promesse di qualsiasi chiamata asincrona all'interno dell'app.
// Se i risultati che ci ritornano sono già un oggetto non c'è bisogno di trasformazioni,
// se è un array dobbiamo trasformarlo in un oggetto.
// Ma non lo facciamo qui, lo facciamo nel reducer ('reducer_prods')