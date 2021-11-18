const kafka = require("kafkajs")
const { EventEmitter } = require("events")

class KafkaClient extends EventEmitter {
	isReady
	kafka

	constructor(kafkaConfig) {
		super()
		this.kafka = new kafka.Kafka({
			clientId: "kafka-poc",
			...kafkaConfig,
		})
	}

	async isKafkaInitialized() {
		if (!this.isReady) throw new Error("KafkaClient is not initialized")
	}
}

module.exports = KafkaClient
