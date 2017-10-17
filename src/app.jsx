import React from 'react';
import { render } from 'react-dom';
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Customers from './scenes/Customers/Customers';
import Products from './scenes/Products';

import 'react-select/dist/react-select.css';

const App = () =>
	<div>
		<Navbar>
			<div className="container">
				<Navbar.Header>
					<Navbar.Brand>
						<Link className="Navbar-brand" to="/">Invoice App</Link>
					</Navbar.Brand>
				</Navbar.Header>
				<Nav>
					<LinkContainer to="/invoices">
						<NavItem>Invoices</NavItem>
					</LinkContainer>
					<LinkContainer to="/products">
						<NavItem>Products</NavItem>
					</LinkContainer>
					<LinkContainer to="/customers">
						<NavItem>Customers</NavItem>
					</LinkContainer>
				</Nav>
			</div>
		</Navbar>
		<main>
			<Switch>
				<Route path="/customers" component={Customers} />
				<Route path="/products" component={Products} />
			</Switch>
		</main>
	</div>

render(
	<BrowserRouter>
		<App />
	</BrowserRouter>, 
	document.getElementById('app-root'));