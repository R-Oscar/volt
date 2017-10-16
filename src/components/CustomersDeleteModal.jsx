import React, { Component } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';

export default class CustomerDeleteModal extends Component {
	constructor(props) {
		super(props);
		this.handleClosing = this.handleClosing.bind(this);
		this.deleteCustomer = this.deleteCustomer.bind(this);
	}

	handleClosing() {
		this.props.closeHandler();
	}

	deleteCustomer() {
		axios.delete(`/api/customers/${this.props.id}`)
		.then((response) => {
			location.reload();
		})
		.catch((error) => console.log(error));
	}

	render() {
		return (
			<Modal show={this.props.visible} onHide={this.handleClosing}>
				<Modal.Header closeButton>
					<Modal.Title>Delete customer</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Are you sure you want to delete this customer?
				</Modal.Body>
				<Modal.Footer>	
					<Button onClick={this.handleClosing}>No</Button>
					<Button onClick={this.deleteCustomer} type="submit" bsStyle="danger">Yes</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}
