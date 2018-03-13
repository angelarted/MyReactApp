import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import promise from 'redux-promise'; //caricare redux-promise da npm

import style from './assets/styles/style.scss';

//components
import App from './components/app';


const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

render(
	<Provider store={createStoreWithMiddleware(reducers)}>
	    <BrowserRouter>
	    	<App />
	    </BrowserRouter>
    </Provider>,
	document.getElementById('app')
); 
