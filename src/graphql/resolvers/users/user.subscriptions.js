const userSubscriptions = {
	userCreated: {
		subscribe: (parent, args, { pubsub }) => {
			return pubsub.asyncIterator("USER_CREATED")
		},
	},
}

module.exports = userSubscriptions
