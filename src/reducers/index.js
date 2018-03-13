import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'; //fa tutto lui per gestire gli state 
													 // dei form non abbiamo bisogno di 
													 // definire nessun reducers per i form!!!
import prodsReducer from './reducer_prods'; /********
											* ok il grosso errore era che avevo messo 
											* ProdsReducers tra parentesi graffe
											********/
import articlesReducer from './reducer_articles';
import selectedArticleReducer from './reducer_selected_article'; 
import purchaseReducer from './reducer_purchases';

const rootReducer = combineReducers({
	form: formReducer,
	prods: prodsReducer,
	articles: articlesReducer, // 'articles' piece of state fetch all the data of the table
							  // we don't need the 'selectedArticle' piece of state
	purchases: purchaseReducer
	//selectedArticle : selectedArticleReducer
});

export default rootReducer;

/************
* qui MAPPIAMO I PIECE OF STATE CON I REDUCER RESPONSABILI di produrne i valori 
* Ogni reduce, anche se si occupa di più di un action creator, 
* ritorna sempre il piece of state che gli è stato associato qui!
* Lo ritorna e lo prende come paramentro inizialmente: lo prende, 
* lo elabora e lo ritorna modificato
*************/