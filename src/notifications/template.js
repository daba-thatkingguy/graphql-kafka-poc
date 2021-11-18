const handlebars = require("handlebars")
const fs = require("fs")

class HandlebarsTemplateProvider {
	/**
	 * @public
	 * @param {object} data
	 * @returns {string}
	 */
	async parse(data) {
		const { file, variables } = data
		const templateFileContent = await fs.promises.readFile(file, {
			encoding: "utf-8",
		})

		/**
		 * @type {import('handlebars')}
		 */
		const parseTemplate = handlebars.compile(templateFileContent)

		return parseTemplate(variables)
	}
}

module.exports = new HandlebarsTemplateProvider()
