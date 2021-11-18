const KafkaClient = require("./KafkaClient")
const { NEW_USER_SIGNUP } = require("./constants")

class Consumer extends KafkaClient {
	consumer
	producer

	constructor(brokers, kafkaConfig, consumerConfig) {
		super({ clientId: "kafka-poc-consumer", brokers, ...kafkaConfig })
		this.consumer = this.kafka.consumer({
			clientId: "kafka-poc-consumer",
			...consumerConfig,
		})
		this.producer = this.kafka.producer()
	}

	/**
	 * @public {string[]}
	 */
	getTopics() {
		return this.topics
	}

	/**
	 * @public
	 */
	async send(topic, messages, key) {
    console.log("🚀 ~ file: Consumer.js ~ line 28 ~ Consumer ~ send ~ messages", messages)
		await this.producer.connect()
		await this.producer.send({
			topic,
			messages: [{
				key,
				value: JSON.stringify(messages),
			}],
		})
	}

	/**
	 * @public {Promise<void>}
	 * connects to all kafka topics and subscribe to all topics
	 */
	async consume(topic) {
		await this.consumer.connect()
		// for (const topic of this.topics) {
		await this.consumer.subscribe({ topic, fromBeginning: true })
		// }
		console.log("🚀 ~ file: Consumer.js ~ line 70 ~ Consumer ~ eachMessage: ~ topic", topic)
		this.isReady = true
	}

	/**
	 * Disconnects from the broker and unsubscribes from the topics
	 *@public {Promise<void>}
	 * @returns a Promise that resolves if the connection is disconnected successfully
	 */
	async disconnect() {
		this.checkReadiness()
		await this.consumer.disconnect()
		this.removeAllListeners()
		this.isReady = false
	}

	/**
	 * Starts consuming messages
	 * @public {Promise<void>}
	 */
	async consumeMessage(callback) {
		// Not absolutely necessary but enforces user to call connect() before calling consume()
		// this.checkReadiness()

		await this.consumer.run({
			autoCommit: false,
			eachMessage: async (payload) => {
        console.log("🚀 ~ file: Consumer.js ~ line 70 ~ Consumer ~ eachMessage: ~ payload", payload)
				// onMessageReceived(payload, this)
        // callback(payload, this)
			},
		})
	}

	/**
	 * Commits the offsets specified by the message
	 *@public {Promise<void>}
	 * @param message - Message from which to get the offset
	 */
	async commit(message) {
		this.checkReadiness()

		await this.consumer.commitOffsets([
			{
				offset: (parseInt(message.offset, 10) + 1).toString(),
				topic: message.topic,
				partition: message.partition,
			},
		])
	}

	/**
	 * @private
	 */
	checkReadiness() {
		if (!this.isReady) {
			throw new Error(
				"Consumer is not currently connected, did you forget to call connect()?"
			)
		}
	}
}


module.exports = Consumer
