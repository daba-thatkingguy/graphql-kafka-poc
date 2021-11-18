const { User } = require("../../../db/models")

const userQueries = {
	getUserById: async (parent, { id }, { ctx }) => {
		const user = await User.findById(id)
		if (!user) {
			return {
				__typename: "Error",
				message: "User not found",
			}
		}
		return { __typename: "ReturnedUser", user }
	},
	getUsers: async (parent, args, ctx) => {
		const users = await User.find({})
		return users
	},
}

module.exports = userQueries
