require("dotenv").config()
const nodemailer = require("nodemailer")
const mailTemplateProvider = require("./template")

console.log("MAILTRAP-EMAIL", process.env.MAILTRAP_HOST)
class MailTrapProvider {
	client
	constructor() {
		/**
		 * @type {import('nodemailer')}
		 */
		this.client = nodemailer.createTransport({
			host: process.env.MAILTRAP_HOST,
			port: process.env.MAILTRAP_PORT,
			auth: {
				user: process.env.MAILTRAP_USER,
				pass: process.env.MAILTRAP_PASSWORD,
			},
		})
	}

	async sendMail({ to, from, subject, templateData }) {
		try {
			await this.client.sendMail({
				from: {
					name: from?.name ?? "daba",
					address: from?.email ?? "noreply@daba.com",
				},
				to: {
					name: to.name,
					address: to.email,
				},
				subject,
				html: await mailTemplateProvider.parse(templateData),
			})
		} catch (error) {
			if (error) {
				console.log(error)
			}
		}
	}
}

module.exports = new MailTrapProvider()
