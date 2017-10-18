import React from 'react';
import axios from 'axios';
import Table from '../../components/Table';
import ModalWindow from '../../components/ModalWindow';
import { Button } from 'react-bootstrap';
import model from './services/customer-columns';

export default class Customers extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			activeModal: '',
			userId: -1
		}

		this.closeModal = this.closeModal.bind(this);
		this.openModal = this.openModal.bind(this);
		this.editHandler = this.editHandler.bind(this);
		this.removeHandler = this.removeHandler.bind(this);
	}

	componentDidMount() {
		axios.get('/api/customers')
		.then((response) => {
			this.setState({
				data: response.data
			})
		})
		.catch((error) => console.log(error));
	}

	createHandler(data) {
		axios.post('/api/customers', data)
		.then((response) => {
			location.reload();
		})
		.catch((error) => console.log(error));
	}

	editHandler(data) {
		axios.put(`/api/customers/${this.state.userId}`, data)
		.then((response) => {
			location.reload();
		})
		.catch((error) => console.log(error));
	}

	removeHandler() {
		axios.delete(`/api/customers/${this.state.userId}`)
		.then((response) => {
			location.reload();
		})
		.catch((error) => console.log(error));
	}

	openModal(activeModal, userId) {
		this.setState({
			activeModal,
			userId
		});
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
			userId
		} = this.state;

		return (
			<div className="container">
				<h1>Customer list</h1>
				<Button onClick={() => this.setState({activeModal: 'create'})}>Create</Button>
				<Table entries={data} 
						columns={model}
						openModal={this.openModal} />
				<ModalWindow visible={activeModal === 'create'} 
							remove={false} 
							action={this.createHandler} 
							fields={model.map(element => {
								return {
									...element,
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
									value: userId !== -1 ? data.find(item => item.id === userId)[element.title.toLowerCase()] : ''
								}
							})}
							closeHandler={this.closeModal} />
					
				<ModalWindow visible={activeModal === 'remove'}
							remove={true}
							action={this.removeHandler}
							fields={[]}
							closeHandler={this.closeModal} />

			</div>
		)
	}
}