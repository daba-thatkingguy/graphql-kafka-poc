const { model, Schema } = require("mongoose")

const PostSchema = new Schema(
	{
		title: String,
		author: { type: Schema.Types.ObjectId, ref: "User" },
	},
	{ timestamps: true }
)

module.exports = model("Post", PostSchema)
