import React from 'react';
import { Switch, Route } from 'react-router-dom';//avevo dimenticato di usare Switch
 
import Login from '../containers/login';
import Azienda from './azienda';
import Table from '../containers/table';
import PurchaseList from '../containers/purchase-list';
import Purchase from '../containers/purchase';
import TableAzienda from '../containers/table-azienda';

const Main =() => {
	//mettere in alto le url più dettagliate
	return(
			<div>
				<Switch>
					<Route path="/azienda/table/:id" component={TableAzienda} />
					<Route path="/table/:id" component={Table} />
					<Route path="/azienda" component={Azienda} />
				</Switch>
				<Switch>
					<Route path="/purchases/:id" component={Purchase} />
					<Route path="/purchases" component={PurchaseList} />
				</Switch>
				<Route exact path="/" component={Login} />
			</div>
		);

}

export default Main;