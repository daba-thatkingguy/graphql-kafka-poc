import { useQuery, gql } from "@apollo/client"
import {
	GET_ALL_USERS,
	GET_NAME,
	GET_USER_BY_ID,
	GET_USER_NAME,
} from "../constants"

const styles = {
	display: "flex",
	width: "50%",
	backgroundColor: "red",
	// margin: "2em",
	flexDirection: "row",
	justifyContent: "spaceBetween",
	// margin: "1em",
}

const children = {
	flexDirection: "row",
	justifyContent: "spaceBetween",
	alignItems: "center",
}

export const GetAllUsers = () => {
	const { loading, error, data } = useQuery(GET_ALL_USERS)
	console.log("🚀 ~ file: queries.js ~ line 11 ~ GetAllUsers ~ data", data)

	if (loading) return loading
	if (error) return error
	return data

	// return data.getUsers.map(({ name, email, username, _id }) => (
	// 	<div key={_id} style={styles}>
	// 		<div style={children}>
	// 			<p>{_id}</p>
	// 			<p>{name}</p>
	// 			<p>{email}</p>
	// 			<p>{username}</p>
	// 		</div>
	// 	</div>
	// ))
}

export const GetName = () => {
	const { loading, error, data } = useQuery(GET_NAME)

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error :</p>

	return data.getUsers.map(({ name, _id }) => (
		<div key={_id}>
			<p>
				{_id}
				{name}
			</p>
		</div>
	))
}

export const GetUserById = (id) => {
	const { loading, error, data } = useQuery(GET_USER_BY_ID, { id })

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error :</p>

	return data.getUserById.map(({ name, _id }) => (
		<div key={_id}>
			<p>
				{_id}
				{name}
			</p>
		</div>
	))
}
