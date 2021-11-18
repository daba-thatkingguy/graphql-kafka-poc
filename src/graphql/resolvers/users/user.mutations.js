const { kafkaService } = require("../../../kafka/mini")

const userMutations = {
	createUser: async (parent, { data }, { pubsub }, info) => {
		await kafkaService.produce("user.insert", data)
		const { password, ...rest } = data
    console.log("🚀 ~ file: user.mutations.js ~ line 7 ~ createUser: ~ rest", rest)
		return { __typename: "ReturnedUser", user: rest }
	},
}

module.exports = userMutations
