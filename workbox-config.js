module.exports = {
	globDirectory: '/',
	globPatterns: [
		'**/*.{png,ico,jpg,html,js,json,css}'
	],
	swDest: '/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};