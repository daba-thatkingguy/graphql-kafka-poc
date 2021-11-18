const { EventEmitter } = require("eventemitter3")
const { Kafka } = require("kafkajs")

class KafkaService extends EventEmitter {
	kafka
	producer
	consumer
	isReady
	constructor() {
		super()
		/**
		 * @type {Kafka}
		 */
		this.kafka = new Kafka({
			clientId: "kafka-poc-1",
			// logLevel: "debug",
			brokers: ["localhost:9092"],
		})
		this.producer = this.kafka.producer()
		this.consumer = this.kafka.consumer({
			groupId: "kafka-poc-ids",
		})
	}

	/**
	 * @public {Promise<void>}
	 * @param {string} topic
	 * @param {object} messages
	 * @param {string} key
	 */
	async produce(topic, messages, key) {
		await this.producer.connect()
		await this.producer.send({
			acks: -1,
			topic,
			messages: [{ value: JSON.stringify(messages) }],
		})
		await this.producer.disconnect()
	}

	async consume(topic, callback) {
		await this.consumer.connect()
		await this.consumer.subscribe({ topic, fromBeginning: true })
		await this.consumer.run({
			autoCommit: true,
			autoCommitInterval: 5000,
			eachMessage: async ({ topic, partition, message }) => {
				callback(message, this)
			},
		})
		this.isReady = true
		// await this.consumer.disconnect()
	}

	async commitOffset(topic, partition, offset) {
		await this.consumer.commitOffsets({
			topic,
			partition,
			offset: (parseInt(offset, 10) + 1).toString(),
		})
	}

	async admin({ ...data }) {
		await this.kafka.admin().connect()
		return this.kafka.admin().createTopics({
			topics: [data],
		})
	}
}

const kafkaService = new KafkaService()
module.exports = { kafkaService }
