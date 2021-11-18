import React from "react"
import { Table } from "react-bootstrap"

function TableComponent({
	headers = ["ID", "Name", "Username", "Email"],
	children,
}) {
	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					{headers.map((header) => (
						<th>{header}</th>
					))}
				</tr>
			</thead>
			<tbody>{children}</tbody>
		</Table>
	)
}

export default TableComponent
