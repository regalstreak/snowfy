module.exports = {
	root: true,
	extends: '@react-native-community',
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	rules: {
		'jsx-quotes': [2, 'prefer-single'],
		'react-native/no-inline-styles': 0,
	},
};
