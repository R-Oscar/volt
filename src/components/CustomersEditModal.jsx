import React, { Component } from 'react';
import axios from 'axios';
import { Button, Modal, FormGroup, FormControl } from 'react-bootstrap';

export default class CustomersEditModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: -1,
			name: '',
			address: '',
			phone: ''
		}
		this.handleClosing = this.handleClosing.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.editCustomer = this.editCustomer.bind(this);
	}

	componentWillReceiveProps(props) {
		this.setState({
			...props.data
		});
	}

	handleInputChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleClosing() {
		this.props.closeHandler();
	}

	editCustomer() {
		const {
			id,
			name,
			address,
			phone
		} = this.state;

		axios.put(`/api/customers/${id}`, {
			name,
			address,
			phone
		})
		.then((response) => {
			location.reload();
		})
		.catch((error) => console.log(error));
	}

	render() {
		const {
			id,
			name,
			address,
			phone
		} = this.state

		return (
			<Modal show={this.props.visible} onHide={this.handleClosing}>
				<Modal.Header closeButton>
					<Modal.Title>Edit customer</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<FormGroup controlId="name">
						<FormControl name="name" 
									type="text" 
									placeholder="Enter the name" 
									onChange={this.handleInputChange}
									value={name} />
					</FormGroup>
					<FormGroup controlId="address">
						<FormControl name="address" 
									type="text" 
									placeholder="Enter the address"
									onChange={this.handleInputChange}
									value={address} />
					</FormGroup>
					<FormGroup controlId="phone">
						<FormControl name="phone" 
									type="text" 
									placeholder="Enter the phone"
									onChange={this.handleInputChange}
									value={phone} />
					</FormGroup>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.handleClosing}>Close</Button>
					<Button onClick={this.editCustomer} type="submit" bsStyle="primary">Edit</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}
