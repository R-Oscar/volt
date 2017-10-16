import React, { Component } from 'react';
import axios from 'axios';
import { Button, Modal, FormGroup, FormControl } from 'react-bootstrap';

export default class CustomersCreateModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			address: '',
			phone: ''
		}
		this.handleClosing = this.handleClosing.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.addCustomer = this.addCustomer.bind(this);
	}

	handleInputChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	addCustomer() {
		axios.post('/api/customers', this.state)
		.then((response) => {
			location.reload();
		})
		.catch((error) => console.log(error));
	}

	handleClosing() {
		this.props.closeHandler();
	}

	render() {
		return (
			<Modal show={this.props.visible} onHide={this.handleClosing}>
				<Modal.Header closeButton>
					<Modal.Title>Add customer</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<FormGroup controlId="name">
						<FormControl name="name" 
									type="text" 
									placeholder="Enter the name" 
									value={this.state.name}
									onChange={this.handleInputChange} />
					</FormGroup>
					<FormGroup controlId="address">
						<FormControl name="address" 
									type="text" 
									placeholder="Enter the address"
									value={this.state.address}
									onChange={this.handleInputChange} />
					</FormGroup>
					<FormGroup controlId="phone">
						<FormControl name="phone" 
									type="text" 
									placeholder="Enter the phone"
									value={this.state.phone}
									onChange={this.handleInputChange} />
					</FormGroup>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.handleClosing}>Close</Button>
					<Button onClick={this.addCustomer} type="submit" bsStyle="primary">Add</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}
