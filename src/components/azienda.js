import React from 'react';
import ProductList from '../containers/product_list';
import Menu from './menu';

const Company = ()=> {

		return(
			<div className="container azienda">
				<h1>Product List</h1>
				<Menu />
				<div className="main-content-container">
					<ProductList />
				</div>
			</div>
		);
}

export default Company;