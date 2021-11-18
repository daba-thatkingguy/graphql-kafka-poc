import React from "react"
import TableComponent from "../components/Table"

function GetNames({ users, error, loading }) {
	return (
		<div>
			<h3>Names</h3>
			<div style={{ display: "flex" }}>
				{loading && <p>Loading</p>}
				{error && <p>Error : {error.message}</p>}
			</div>
			<div>
				<TableComponent headers={["Name", 'Username']}>
					{users &&
						users.map((item) => {
							return (
								<tr key={item._id}>
									<td>{item.name}</td>
									<td>{item.username}</td>
								</tr>
							)
						})}
				</TableComponent>
			</div>
		</div>
	)
}

export default GetNames
