import React, { Fragment } from "react"
import { useQuery } from "@apollo/client"
import { GET_ALL_USERS } from "../constants"
import GetAllUsers from "../page/AllUsers"
import GetNames from "../page/GetNames"

function MainWrapper() {
	const { data, loading, error } = useQuery(GET_ALL_USERS)

	const users = data && data.getUsers
	const styles = {
		display: "flex",
		flexWrap: "wrap",
	}
	const allUsers = {
		flex: "1 0",
		paddingRight: "20px",
	}
	const namesStyle = {
		flex: "1 0",
		paddingLeft: "20px",
	}
	return (
		<Fragment>
			<div style={styles}>
				<div style={allUsers}>
					<GetAllUsers users={users} loading={loading} error={error} />
				</div>
				<div style={namesStyle}>
					<GetNames users={users} loading={loading} error={error} />
				</div>
			</div>
		</Fragment>
	)
}

export default MainWrapper
