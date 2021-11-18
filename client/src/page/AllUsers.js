import React from "react"
import TableComponent from "../components/Table"

function GetAllUsers({ users, loading, error }) {
	return (
		<div>
			<h3>Get all users</h3>
			<div style={{ display: "flex" }}>
				{loading && <p>Loading</p>}
				{error && <p>Error : {error.message}</p>}
			</div>
			<TableComponent>
				{users &&
					users.map((item) => {
						return (
							<tr key={item._id}>
								<td>{item._id}</td>
								<td>{item.name}</td>
								<td>{item.username}</td>
								<td>{item.email}</td>
							</tr>
						)
					})}
			</TableComponent>
		</div>
	)
}

export default GetAllUsers
