import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

export default class Customers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		}
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

	render() {
		const {
			data
		} = this.state;

		return (
			<div className="container">
				<h1>Customer List</h1>
				<Button>Create</Button>
				<table className="table">
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Price</th>
							<th></th>
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