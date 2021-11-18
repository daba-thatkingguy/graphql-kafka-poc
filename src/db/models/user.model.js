const { model, Schema } = require("mongoose")
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
	name: String,
	username: String,
	password: String,
	email: String,
})

UserSchema.pre('save', async function pre(next) {
  if (this.password && this.isNew) {
    const hashedPassword = await bcrypt.hash(this.password, 10)
    this.password = hashedPassword
  }
  next()
})

module.exports = model("User", UserSchema)
