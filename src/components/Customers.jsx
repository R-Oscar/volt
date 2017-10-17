import React from 'react';
import axios from 'axios';
import Table from './Table';
import ModalWindow from './ModalWindow';
import { Button } from 'react-bootstrap';

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
				<h1>Customer List</h1>
				<Button onClick={() => this.setState({activeModal: 'create'})}>Create</Button>
				<Table entries={this.state.data} 
						columns={[{
									id: 0,
									title: "Name"
								  },
								  {
								  	id: 1,
								  	title: "Address"
								  },
								  {
								  	id: 2,
								  	title: "Phone"
								  }]}
						openModal={this.openModal} />
				<ModalWindow visible={activeModal === 'create'} 
							remove={false} 
							action={this.createHandler} 
							fields={[
								{
									id: 0,
									title: 'name',
									value: ''
								},
								{
									id: 1,
									title: 'address',
									value: ''
								},
								{
									id: 2,
									title: 'phone',
									value: ''
								}
							]} 
							closeHandler={this.closeModal} />

				<ModalWindow visible={activeModal === 'edit'}
							remove={false}
							action={this.editHandler}
							fields={[
								{
									id: 0,
									title: 'name',
									value: this.state.userId !== -1 ? data.find(item => item.id === userId).name : ''
								},
								{
									id: 1,
									title: 'address',
									value: this.state.userId !== -1 ? data.find(item => item.id === userId).address : ''
								},
								{
									id: 2,
									title: 'phone',
									value: this.state.userId !== -1 ? data.find(item => item.id === userId).phone : ''
								}
							]}
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