import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const Table = ({ entries, columns, openModal }) => {
	return (
		<div>
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
										<Button onClick={() => openModal('edit', id)}>Edit</Button>
										<Button onClick={() => openModal('remove', id)}>Remove</Button>
									</td>
								</tr>
					})}
				</tbody>
			</table>
		</div>
	);
};

Table.propTypes = {
	entries: PropTypes.array.isRequired,
	columns: PropTypes.array.isRequired,
	openModal: PropTypes.func.isRequired
}

export default Table;