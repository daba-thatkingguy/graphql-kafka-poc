require("./kafka/admin")
require('./notifications')
const express = require("express")
const connectDB = require("./db/index")
const { createServer } = require("http")
const { execute, subscribe } = require("graphql")
const { SubscriptionServer } = require("subscriptions-transport-ws")
const { ApolloServer } = require("apollo-server-express")
const schema = require("./graphql/schema")
const { PubSub } = require("graphql-subscriptions")

const pubsub = new PubSub()
;(async function () {
	connectDB()
	const app = express()
	const httpServer = createServer(app)
	const subscriptionServer = SubscriptionServer.create(
		{
			schema,
			execute,
			subscribe,
		},
		{ server: httpServer, path: "/graphql" }
	)

	const apolloServer = new ApolloServer({
		context: ({ req }) => ({
			...req,
			neo4jDatabase: process.env.NEO4J_DATABASE,
			token: req.headers.authorization ? req.headers.authorization : null,
			pubsub,
		}),
		schema,
		introspection: true,
		playground: process.env.NODE_ENV === "development",
		plugins: [
			{
				async serverWillStart() {
					return {
						async drainServer() {
							subscriptionServer.close()
						},
					}
				},
			},
		],
	})

	await apolloServer.start()
	apolloServer.applyMiddleware({ app })

	const port = process.env.PORT || 4000
	httpServer.listen(port, () => console.log(`Server started on port ${port}`))
})()
