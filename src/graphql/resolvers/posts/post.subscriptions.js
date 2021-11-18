const postSubscriptions = {
	postCreated: {
		subscribe: (parent, args, { pubsub }) => {
			return pubsub.asyncIterator("POST_CREATED")
		},
	},
}

module.exports = postSubscriptions
