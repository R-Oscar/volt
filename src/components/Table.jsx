import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const Table = ({ entries, columns }) => {
	return (
		<table className="table">
			<thead>
				<tr>
					<th>#</th>
					{columns.map(element => {
						return <th key={element.id}>{element.title}</th>	
					})}
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{entries.map((element, index) => {
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
	);
};

Table.propTypes = {
	entries: PropTypes.array.isRequired,
	columns: PropTypes.array.isRequired
}

export default Table;