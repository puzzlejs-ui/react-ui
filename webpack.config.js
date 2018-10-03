const path = require('path');

module.exports = {
	devtool   : 'source-map',
	entry     : './index.js',
	output    : {
		filename          : './react-draggable-light.js',
		sourceMapFilename : './react-draggable-light.js.map',
		library           : 'ReactDraggableLight',
		libraryTarget     : 'umd'
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
	module    : {
		rules : [
			{
				test    : /\.(?:js).?$/,
				loader  : 'babel-loader',
				exclude : /(node_modules)/
			}
		]
	},
	resolve   : {
		alias : {
			'react'     : path.resolve(__dirname, './node_modules/react'),
			'react-dom' : path.resolve(__dirname, './node_modules/react-dom')
		}
	}
};