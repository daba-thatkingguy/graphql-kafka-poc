const { readFileSync, readdirSync } = require("fs")
const { join } = require("path")
const { makeExecutableSchema } = require("@graphql-tools/schema")
const resolveTypes = require("./resolve.types")
const {
	userMutations,
	userQueries,
	userSubscriptions,
} = require("./resolvers/users")
const { postMutations, postSubscriptions } = require("./resolvers/posts")

const gqlFiles = readdirSync(join(__dirname, "./typedefs"))

let typeDefs = ""

gqlFiles.forEach((file) => {
	typeDefs += readFileSync(join(__dirname, "./typedefs", file), {
		encoding: "utf8",
	})
})

const schema = makeExecutableSchema({
	typeDefs,
	resolvers: {
		...resolveTypes,
		Query: {
			...userQueries,
		},
		Mutation: {
			...userMutations,
			...postMutations,
		},
		Subscription: {
			...postSubscriptions,
			...userSubscriptions,
		},
	},
})

module.exports = schema
