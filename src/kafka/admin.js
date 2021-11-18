const { kafkaService } = require("./mini")

kafkaService.admin(
	{
		topic: "user.insert",
		numPartitions: 1,
		replicationFactor: 1,
	},
	{
		topic: "user.created",
		numPartitions: 1,
		replicationFactor: 1,
	}
)
