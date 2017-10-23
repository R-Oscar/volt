import React, { Component } from 'react';
import axios from 'axios';
import Table from '../../components/Table';
import ModalWindow from '../../components/ModalWindow'
import { Button } from 'react-bootstrap';
import model from './services/product-columns';

export default class Products extends Component {
	url = '/api/products/';

	refreshData() {
		axios.get(this.url)
		.then((response) => {
			this.setState({
				data: response.data,
				activeModal: '',
				productId: -1
			})
		})
		.catch((error) => console.log(error));
	}

	constructor(props) {
		super(props);

		this.state = {
			data: [],
			activeModal: '',
			productId: -1
		}
		this.createHandler = this.createHandler.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.openModal = this.openModal.bind(this);
		this.editHandler = this.editHandler.bind(this);
		this.removeHandler = this.removeHandler.bind(this);
	}

	editHandler(data) {
		axios.put(this.url + this.state.productId, data)
		.then((response) => {
			this.refreshData();
		})
		.catch((error) => console.log(error));
	}

	removeHandler() {
		axios.delete(this.url + this.state.productId)
		.then((response) => {
			this.refreshData();
		})
		.catch((error) => console.log(error));
	}

	openModal(activeModal, productId) {
		this.setState({
			activeModal,
			productId
		});
	}

	componentDidMount() {
		document.title = "Products";
		axios.get(this.url)
		.then((response) => {
			this.setState({
				data: response.data
			})
		})
		.catch((error) => console.log(error));
	}

	createHandler(data) {
		axios.post(this.url, data)
		.then((response) => {
			this.refreshData();
		})
		.catch((error) => console.log(error));
	}

	closeModal() {
		this.setState({
			activeModal: ''
		});
	}

	render() {
		const {
			activeModal,
			data,
			productId
		} = this.state;

		return (
			<div className="container">
				<h1>Product list</h1>
				<Button onClick={() => this.setState({activeModal: 'create'})}>Create</Button>
				<Table entries={this.state.data} 
						columns={model}
						openModal={this.openModal} />

				<ModalWindow visible={activeModal === 'create'} 
							remove={false} 
							action={this.createHandler} 
							fields={model.map(element => {
								return {
									id: element.id,
									title: element.title.toLowerCase(),
									value: ''
								}
							})} 
							closeHandler={this.closeModal} />

				<ModalWindow visible={activeModal === 'edit'}
							remove={false}
							action={this.editHandler}
							fields={model.map(element => {
								return {
									id: element.id,
									title: element.title.toLowerCase(),
									value: productId !== -1 ? data.find(item => item.id === productId)[element.title.toLowerCase()] : ''
								}
							})}
							closeHandler={this.closeModal} />
					
				<ModalWindow visible={activeModal === 'remove'}
							remove={true}
							action={this.removeHandler}
							fields={[]}
							closeHandler={this.closeModal} />
			</div>
		);
	}
}
