module.exports = {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{png,ico,jpg,html,js,json,css}'
	],
	swDest: 'public/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};