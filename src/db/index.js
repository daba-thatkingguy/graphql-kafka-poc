const Mongoose = require("mongoose")
const UserRepository  = require("./repository/UserRepository")

let isConnected
let db

const connectDB = async () => {
	if (isConnected) return db

	const url = process.env.MONGO_DB_URL || "mongodb://localhost:27017/kafka-poc"
	try {
		db = await Mongoose.connect(url)
		isConnected = db.connections[0].readyState
		return db
	} catch (err) {
		throw new Error(err)
	}
}

UserRepository()
module.exports = connectDB
