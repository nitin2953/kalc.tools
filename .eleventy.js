const beautify = require("./src/_functions/beautify");
const minify = require("./src/_functions/minify");
const mdAttr = require("./src/_functions/md-attr");

const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = !isProduction;

module.exports = function (eleventyConfig) {
	eleventyConfig.setQuietMode(true);

	eleventyConfig.setDataDeepMerge(false);

	eleventyConfig.addPassthroughCopy({
		"./src/assets/fonts": "assets/fonts/",
		"./src/assets/images/**/*.*": "assets/images/",
		// "./src/assets/js/main.js": "assets/js/main.js",
		// "./src/assets/scss/main.css": "assets/css/main.css",
	});


	eleventyConfig.addWatchTarget("src/_includes/i-css/");
	eleventyConfig.addWatchTarget("src/_includes/i-js/");

	eleventyConfig.addWatchTarget("src/assets/i-scss/");
	eleventyConfig.addWatchTarget("src/assets/i-js/");

	mdAttr(eleventyConfig);

	if (isDevelopment) eleventyConfig.addTransform("beautify", beautify);
	if (isProduction) eleventyConfig.addTransform("minify", minify);
	console.log(isProduction ? "********* 11TY PRODUCTION MODE *********" : "********* 11TY DEVELOPMENT MODE *********");

	return {
		templateFormats: ["njk", "md" /*, "html" */],
		markdownTemplateEngine: "njk",
		passthroughFileCopy: true,
		dir: {
			includes: "./../_includes",
			data: "./../_data",
			input: "src/site",
			output: "dist",
		},
	};
};
