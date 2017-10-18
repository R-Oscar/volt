import React, { Component } from 'react';
import axios from 'axios';
import Table from '../../components/Table';
import model from './services/product-columns';

export default class Products extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			activeModal: '',
			productId: -1
		}
	}

	openModal(activeModal, productId) {
		this.setState({
			activeModal,
			productId
		});
	}

	componentDidMount() {
		axios.get('/api/products')
		.then((response) => {
			this.setState({
				data: response.data
			})
		})
		.catch((error) => console.log(error));
	}

	render() {
		console.log(this.state.data);
		return (
			<div className="container">
				<h1>Product list</h1>
				<Table entries={this.state.data} 
						columns={model}
						openModal={this.openModal} />
			</div>
		);
	}
}
