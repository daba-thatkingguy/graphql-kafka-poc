import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import { CREATE_USER, GET_ALL_USERS } from "./constants"

function UserCreate() {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [username, setUsername] = useState("")
	const [createUser, { data, error, loading }] = useMutation(CREATE_USER)
	if (loading) return "Submitting..."
	if (error) return `Submission error! ${error.message}`
	return (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					createUser({
						variables: {
							data: {
								name,
								email,
								password,
								username,
							},
						},
						update(cache, { data: { createUser } }) {
							let { getUsers } = cache.readQuery({ query: GET_ALL_USERS })
							cache.writeQuery({
								query: GET_ALL_USERS,
								data: { getUsers: getUsers.concat([createUser]) },
							})
						},
					})
				}}
			>
				<div className="form-group">
					<label htmlFor="exampleInputEmail1">Email address</label>
					<input
						type="email"
						className="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputName">Name</label>
					<input
						type="text"
						className="form-control"
						id="exampleInputName"
						aria-describedby="nameHelp"
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputUsername">Username</label>
					<input
						type="text"
						className="form-control"
						id="exampleInputUsername"
						aria-describedby="usernameHelp"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputPassword">Password</label>
					<input
						type="password"
						className="form-control"
						id="exampleInputPassword"
						aria-describedby="passwordHelp"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button className="btn btn-primary">Submit</button>
			</form>
		</div>
	)
}

export default UserCreate
