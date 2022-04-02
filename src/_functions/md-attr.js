const mdIt = require("markdown-it");
const mdItAttrs = require("markdown-it-attrs");

const mdOptions = {
	html: true,
	breaks: true,
	linkify: true,
};

function mdAttr(eleventyConfig) {
	const mdLib = mdIt(mdOptions)
		.use(mdItAttrs)
		.disable("code");

	eleventyConfig.setLibrary("md", mdLib);
}

module.exports = mdAttr;