const { kafkaService } = require("../kafka/mini")
const mailer = require("../notifications/email")
const path = require("path")
const template = path.join(__dirname, "mail.hbs")

kafkaService.consume("user.created", async (message, consumer) => {
  console.log("🚀 ~ file: index.js ~ line 7 ~ kafkaService.consume ~ message", message)
	const { value } = message
  console.log("🚀 ~ file: index.js ~ line 8 ~ kafkaService.consume ~ value", value)
	const user = JSON.parse(value.toString())
	const { email, name } = user
	console.log("SENDING-MAIL-RIGHT-NOW")
	await mailer.sendMail({
		to: { email, name },
		from: { email: "dabaFinance", name: "dabaFinance" },
		subject: "Welcome to dabaFinance",
		templateData: {
			file: template,
			variables: {
				name,
			},
		},
	})
})
