import React from 'react';
import axios from 'axios';
import CustomersCreateModal from './CustomersCreateModal';
import CustomersEditModal from './CustomersEditModal';
import CustomersDeleteModal from './CustomersDeleteModal';
import Table from './Table';
import ModalWindow from './ModalWindow';

export default class Customers extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showCreateModal: false,
			showEditModal: false,
			editModalData: {},
			showDeleteModal: false,
			deleteModalId: -1,
			data: []
		}

		this.openCreateModal = this.openCreateModal.bind(this);
		this.closeCreateModal = this.closeCreateModal.bind(this);
		this.openEditModal = this.openEditModal.bind(this);
		this.closeEditModal = this.closeEditModal.bind(this);
		this.openDeleteModal = this.openDeleteModal.bind(this);
		this.closeDeleteModal = this.closeDeleteModal.bind(this);
	}

	openCreateModal() {
		this.setState({
			showCreateModal: true
		})
	}

	closeCreateModal() {
		this.setState({
			showCreateModal: false
		})
	}

	openEditModal(editModalData) {
		this.setState({
			showEditModal: true,
			editModalData
		})
	}

	closeEditModal() {
		this.setState({
			showEditModal: false
		})
	}

	openDeleteModal(deleteModalId) {
		this.setState({
			showDeleteModal: true,
			deleteModalId
		})
	}

	closeDeleteModal() {
		this.setState({
			showDeleteModal: false
		})
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

	render() {
		const {
			data
		} = this.state;

		return (
			<div className="container">
				<h1>Customer List</h1>
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
								  }]} />
				<ModalWindow visible={true} remove={false} action={this.createHandler} fields={[
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
				]} />
					
			</div>
		)
	}
}