const path = require('path');
const config = require('./default.config.js');

module.exports = [
	Object.assign({}, config, {
		entry   : {
			'Draggable' : path.resolve(__dirname,'../lib/components/Draggable/Draggable.js')
		},
		output : {
			path              : path.resolve(__dirname, '../dist/components'),
			library           : ['Puzzle', '[name]'],
			filename          : '[lc-name].js',
			sourceMapFilename : '[lc-name].js.map',
			libraryTarget     : 'umd',
		}
	}),

	Object.assign({}, config, {
		entry  : path.resolve(__dirname, '../lib/components/index.js'),
		output : {
			path              : path.resolve(__dirname, '../dist'),
			library           : "Puzzle",
			filename          : 'puzzle.js',
			sourceMapFilename : 'puzzle.js.map',
			libraryTarget     : 'umd',
		}
	})
];