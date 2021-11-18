const { kafkaService } = require("../../../kafka/mini")

const userMutations = {
	createUser: async (parent, { data }, { pubsub }, info) => {
		await kafkaService.produce("user.insert", data)
		const { password, ...rest } = data
		return { __typename: "ReturnedUser", user: rest }
	},
}

module.exports = userMutations
