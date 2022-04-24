const minifier = require("html-minifier-terser").minify;

const minifierConfig = {
	collapseBooleanAttributes: true,
	collapseWhitespace: true,
	// collapseInlineTagWhitespace: true,
	decodeEntities: true,
	ignoreCustomComments: [ /।। श्री ।।/ ],
	minifyCSS: true,
	minifyJS: true,
	// minifyURLs: true,
	removeAttributeQuotes: true,
	removeComments: true,
	removeEmptyAttributes: true,
	sortAttributes: true,
	sortClassName: true
}


function minify(content, outputPath) {
	if (!outputPath) return;

	if (outputPath.endsWith(".html") ) {
      return minifier(content, minifierConfig);
   }
	return content;
}

module.exports = minify;