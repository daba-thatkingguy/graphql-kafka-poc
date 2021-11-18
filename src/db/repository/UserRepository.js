const { kafkaService } = require("../../kafka/mini")
const { User } = require("../models")

const UserRepository = () => {
	kafkaService.consume("user.insert", async (msg, consumer) => {
		const { value } = msg
		const user = JSON.parse(value.toString())
		if (Object.keys(user).length <= 2) {
			throw new Error("User data is empty")
		}
		const newuser = await User.create(user)
	})
}

module.exports = UserRepository
