const html_beautify = require("js-beautify").html;
const css_beautify = require("js-beautify").css;
const js_beautify = require("js-beautify").js;
const beautifyConfig = {
	indent_char: "\t",
	wrap_line_length: "160",
	// preserve_newlines: false,
	max_preserve_newlines: 1,
	indent_empty_lines: false,
};

function Xbeautify(content, outputPath) {
	if (!outputPath) return;

	let extension = outputPath.split(".").pop();
	switch (extension) {
		case "html": return html_beautify(content, beautifyConfig);
		case "css": return css_beautify(content, beautifyConfig);
		case "js": return js_beautify(content, beautifyConfig);
	}
	return content;
}

function beautify(content, outputPath) {
	if (!outputPath) return;

	if(outputPath.endsWith(".html") ) {
      return html_beautify(content, beautifyConfig);
   }
	return content;
}

module.exports = beautify;