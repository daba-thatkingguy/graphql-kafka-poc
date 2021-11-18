const resolveTypes = {
	Error: {
		__resolveType(obj, context, info) {
			if (obj.__typename === "Error") return "Error"
		},
	},
	CreateUserResponse: {
		__resolveType(obj, context, info) {
			if (obj.__typename === "ReturnedUser") return "ReturnedUser"
		},
	},
	GetUserResponse: {
		__resolveType(obj, context, info) {
			if (obj.__typename === "Error") return "Error"
			if (obj.__typename === "ReturnedUser") return "ReturnedUser"
			return null
		},
	},
}

module.exports = resolveTypes
