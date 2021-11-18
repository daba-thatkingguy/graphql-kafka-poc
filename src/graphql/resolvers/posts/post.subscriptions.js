const pubsub = require("../../../app")
const postSubscriptions = {
	postCreated: {
		subscribe: () => pubsub.asyncIterator("POST_CREATED"),
	},
}
module.exports = postSubscriptions
