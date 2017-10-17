import React from 'react';
import axios from 'axios';
import { Button, Modal, FormGroup, FormControl } from 'react-bootstrap';
import CustomersCreateModal from './CustomersCreateModal';
import CustomersEditModal from './CustomersEditModal';
import CustomersDeleteModal from './CustomersDeleteModal';
import Table from './Table';

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
				<Button onClick={this.openCreateModal}>Create</Button>
				<CustomersCreateModal visible={this.state.showCreateModal} closeHandler={this.closeCreateModal} />
				<CustomersEditModal visible={this.state.showEditModal} 
									closeHandler={this.closeEditModal}
									data={this.state.editModalData} />
				<CustomersDeleteModal visible={this.state.showDeleteModal}
									closeHandler={this.closeDeleteModal}
									id={this.state.deleteModalId} />
				<table className="table">
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Address</th>
							<th>Phone</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{data.map((element, index) => {
							const {
								id,
								name,
								address,
								phone
							} = element

							return <tr key={id}>
										<td>{index + 1}</td>
										<td>{name}</td>
										<td>{address}</td>
										<td>{phone}</td>
										<td>
											<Button onClick={() => this.openEditModal({
												id,
												name,
												address,
												phone
											})}>Edit</Button>
											<Button onClick={() => this.openDeleteModal(id)}>Remove</Button>
										</td>
									</tr>
						})}
					</tbody>
				</table>
			</div>
		)
	}
}