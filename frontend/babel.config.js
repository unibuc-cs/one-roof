module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo',
			['@babel/preset-env', {targets: {node: 'current'}}],
			'@babel/preset-react',
			'@babel/preset-typescript'
		],
		plugins: [
			['module:react-native-dotenv', {
				moduleName: '@env',
				path: '.env',
				safe: true,
				allowUndefined: false
			}],
			'babel-plugin-transform-es2015-modules-commonjs',
			'react-native-reanimated/plugin',
		]
	};
};
