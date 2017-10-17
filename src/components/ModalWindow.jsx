import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

const ModalWindow = ({ visible, remove }) => {
	return (
		<Modal show={visible}>
	      <Modal.Header closeButton>
	        <Modal.Title>Modal title</Modal.Title>
	      </Modal.Header>


	      <Modal.Body>
	      	{remove ? (
	      		'Are you sure you want to remove this entry?'
	      	) : (
	      		<>
	      	) }
	      </Modal.Body>

	      <Modal.Footer>
	        <Button>Close</Button>
	        <Button bsStyle="primary">Save changes</Button>
	      </Modal.Footer>

	    </Modal>
	);
};

ModalWindow.propTypes = {
	visible: PropTypes.bool.isRequired,
	remove: PropTypes.bool.isRequired,
	action: PropTypes.func.isRequired,
	fields: PropTypes.object.isRequired
}

export default ModalWindow;