const path = require('path');
const LowerCaseNamePlugin = require('webpack-lowercase-name');

const config = {
	devtool   : 'source-map',
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
}

module.exports = [
	Object.assign({}, config, {
		entry  : {
			'Draggable' : './lib/components/Draggable/Draggable.js',
			'Button'    : './lib/components/Button/Button.js',
		},
		output : {
			path              : path.resolve(__dirname, 'dist/components'),
			library           : ['Puzzle', '[name]'],
			filename          : '[lc-name].js',
			sourceMapFilename : '[lc-name].js.map',
			libraryTarget     : 'umd',
		}
	}),

	Object.assign({}, config, {
		entry  : './lib/components/index.js',
		output : {
			path              : path.resolve(__dirname, 'dist'),
			library           : "Puzzle",
			filename          : 'puzzle.js',
			sourceMapFilename : 'puzzle.js.map',
			libraryTarget     : 'umd',
		}
	})
];