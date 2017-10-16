import React from 'react';
import axios from 'axios';
import { Button, Modal, FormGroup, FormControl } from 'react-bootstrap';

export default class Customers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			data: [],
			name: '',
			address: '',
			phone: ''
		}
	}

	open() {
		this.setState({
			...this.state,
			showModal: true
		})
	}

	close() {
		this.setState({
			...this.state,
			showModal: false
		})
	}

	componentDidMount() {
		axios.get('/api/customers')
		  .then((response) => {
		    this.setState({
		    	...this.state,
		    	data: response.data
		    })
		  })
		  .catch((error) => console.log(error));
	}

	addCustomer(e) {
		e.preventDefault();
		axios.post('/api/customers', {
			name: this.state.name,
			address: this.state.address,
			phone: this.state.phone
		})
		.then((response) => {
			console.log(response);
		})
		.catch((error) => console.log(error));
	}

	nameChange(e) {
		this.setState({
			...this.state,
			name: e.target.value
		});
	}

	addressChange(e) {
		this.setState({
			...this.state,
			address: e.target.value
		});
	}

	phoneChange(e) {
		this.setState({
			...this.state,
			phone: e.target.value
		});
	}

	render() {
		const {
			data
		} = this.state;

		return (
			<div className="container">
				<h1>Customer List</h1>
				<Button onClick={e => this.open(e)}>Create</Button>

				<Modal show={this.state.showModal} onHide={e => this.close(e)}>
					<Modal.Header closeButton>
						<Modal.Title>Add customer</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<FormGroup controlId="name">
							<FormControl name="name" 
										type="text" 
										placeholder="Enter the name" 
										value={this.state.name}
										onChange={e => this.nameChange(e)} />
						</FormGroup>
						<FormGroup controlId="address">
							<FormControl name="address" 
										type="text" 
										placeholder="Enter the address"
										value={this.state.address}
										onChange={e => this.addressChange(e)} />
						</FormGroup>
						<FormGroup controlId="phone">
							<FormControl name="phone" 
										type="number" 
										placeholder="Enter the phone"
										value={this.state.phone}
										onChange={e => this.phoneChange(e)} />
						</FormGroup>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={e => this.close(e)}>Close</Button>
						<Button onClick={e => this.addCustomer(e)} type="submit" bsStyle="primary">Add</Button>
					</Modal.Footer>
				</Modal>

				<table className="table">
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Address</th>
							<th>Phone</th>
						</tr>
					</thead>
					<tbody>
						{data.map((element, index) => {
							return <tr key={element.id}>
										<td>{index + 1}</td>
										<td>{element.name}</td>
										<td>{element.address}</td>
										<td>{element.phone}</td>
									</tr>
						})}
					</tbody>
				</table>
			</div>
		)
	}
}