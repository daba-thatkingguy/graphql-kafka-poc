const { Post } = require("../../../db/models/")
const kafkaService = require("../../../kafka/mini")

const postMutations = {
	createPost: async (parent, { data: { authorId, title } }, { pubsub }) => {
		const post = await Post.create({ author: authorId, title })
		pubsub.publish("POST_CREATED", { postCreated: post })
		return post
	},
}

module.exports = postMutations
