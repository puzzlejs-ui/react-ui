const path = require('path');

const LowerCaseNamePlugin = require('webpack-lowercase-name');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode      : process.env.NODE_ENV,
    devtool   : 'source-map',
    profile   : true,
	module    : {
		rules : [
			{
				test    : /\.js$/,
				exclude : /(node_modules)/,
				use     : {
					loader: "babel-loader"
				}
			}
		]
	},
	resolve   : {
		alias : {
			'react'     : path.resolve(__dirname, './node_modules/react'),
			'react-dom' : path.resolve(__dirname, './node_modules/react-dom')
		}
	},
	externals : {
		'react'     : {
			commonjs  : 'react',
			commonjs2 : 'react',
			amd       : 'React',
			root      : 'React'
		},
		'react-dom' : {
			commonjs  : 'react-dom',
			commonjs2 : 'react-dom',
			amd       : 'ReactDOM',
			root      : 'ReactDOM'
		}
	},
	plugins: [
        new LowerCaseNamePlugin()
    ],
    optimization: {
		minimizer: [
			new UglifyJsPlugin({
				uglifyOptions: {
					output: {
						comments: false
					}
				}
			})
		]
	}
}