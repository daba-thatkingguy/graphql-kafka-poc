import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import { CREATE_USER, GET_ALL_USERS } from "./constants"

function UserCreate() {
	const [title, setTitle] = useState("")
	const [author, setAuthor] = useState("")

	const [createPost, { error, loading }] = useMutation(CREATE_USER)
	if (loading) return "Submitting..."
	if (error) return `Submission error! ${error.message}`
	return (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					createPost({
						variables: {
							data: {
								title,
								author,
							},
						},
						update(cache, { data: { createPost } }) {
							let { getUsers } = cache.readQuery({ query: GET_ALL_USERS })
							cache.writeQuery({
								query: GET_ALL_USERS,
								data: { getUsers: getUsers.concat([createPost]) },
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
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<label htmlFor="authorId">Author Id</label>
					<input
						type="text"
						className="form-control"
						id="authorId"
						aria-describedby="titleHelp"
						placeholder="Enter Title"
						value={author}
						onChange={(e) => setAuthor(e.target.value)}
					/>
				</div>
				<button className="btn btn-primary">Submit</button>
			</form>
		</div>
	)
}

export default UserCreate
