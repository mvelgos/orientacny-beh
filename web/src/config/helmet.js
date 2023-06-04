module.exports = {
	contentSecurityPolicy: false,
	crossOriginResourcePolicy: { 
		policy: "same-site" 
	},
	referrerPolicy: {
		policy: ["origin"],
	},
}