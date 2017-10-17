import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, FormGroup, FormControl } from 'react-bootstrap';

export default class ModalWindow extends React.Component {
	constructor(props) {
		super(props);

		let keys = props.fields.map(element => element.title);
		let values = props.fields.map(element => element.value);

		let result = {};
		keys.forEach((key, i) => result[key] = values[i]);
		this.state = result;
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	static propTypes = {
		visible: PropTypes.bool.isRequired,
		remove: PropTypes.bool.isRequired,
		action: PropTypes.func.isRequired,
		fields: PropTypes.array,
		closeHandler: PropTypes.func.isRequired
	}

	componentWillReceiveProps(props) {
		let keys = props.fields.map(element => element.title);
		let values = props.fields.map(element => element.value);

		let result = {};
		keys.forEach((key, i) => result[key] = values[i]);
		this.setState(result);
	}

	handleInputChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	render() {
		const {
			visible,
			remove,
			action,
			fields,
			closeHandler
		} = this.props;

		return (
			<Modal show={visible} onHide={closeHandler}>
				<Modal.Header closeButton>
					<Modal.Title>Modal title</Modal.Title>
				</Modal.Header>

				{remove ? (
					<Modal.Body>Are you sure you want to remove this entry?</Modal.Body>
				) : (
					<Modal.Body>
						{fields.map(element => {
							return <FormGroup controlId={element.title} key={element.id}>
										<FormControl name={element.title} 
													type="text" 
													placeholder={"Enter the " + element.title}
													value={this.state[element.title]}
													onChange={this.handleInputChange} />
									</FormGroup>
						})}
					</Modal.Body>
				) }

				{remove ? (
					<Modal.Footer>
						<Button>No</Button>
						<Button bsStyle="danger" onClick={action}>Yes</Button>
					</Modal.Footer>
				) : (
					<Modal.Footer>
						<Button onClick={closeHandler}>Cancel</Button>
						<Button bsStyle="primary" onClick={() => action(this.state)}>OK</Button>
					</Modal.Footer>
				)}
		    </Modal>
		);
	}
}