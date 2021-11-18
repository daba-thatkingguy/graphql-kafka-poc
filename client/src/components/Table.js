import React from "react"
import { Table } from "react-bootstrap"

function TableComponent({
	headers = [{ id: "ID" }, { id: "Name" }, { id: "Username" }, { id: "Email" }],
	children,
}) {
	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					{headers.map((header) => (
						<th key={header.id}>{header.id}</th>
					))}
				</tr>
			</thead>
			<tbody>{children}</tbody>
		</Table>
	)
}

export default TableComponent
