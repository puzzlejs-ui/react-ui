const config = require('./webpack.default.config.js');
const path = require('path');
const isProd = process.env.NODE_ENV === 'production';

module.exports = [
	Object.assign({}, config, {
		entry   : {
			'Puzzle' : path.resolve(__dirname, '../lib/components/index.js'),
		},
		output : {
			path              : path.resolve(__dirname, '../dist'),
			library           : '[name]',
			filename          : isProd ? '[lc-name].min.js' : '[lc-name].js',
			libraryTarget     : 'umd',
		}
	}),

	Object.assign({}, config, {
		entry   : {
			'Draggable' : path.resolve(__dirname,'../lib/components/Draggable/Draggable.js')
		},
		output : {
			path              : path.resolve(__dirname, '../dist/components'),
			library           : ['Puzzle', '[name]'],
			filename          : isProd ? '[lc-name].min.js' : '[lc-name].js',
			libraryTarget     : 'umd',
			libraryExport     : "default",
		}
	})
];