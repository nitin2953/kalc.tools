const { DateTime } = require("luxon");


const luxonFunc = {

	dateToFormat: function (date, format) {
		return DateTime.fromJSDate(date, { zone: "ist" }).toFormat(String(format));
	},

	dateToISO: function (date) {
		return DateTime.fromJSDate(date, { zone: "ist" }).toISO({
			includeOffset: false,
			suppressMilliseconds: false,
		});
	},
	dateToIST: function (date) {
		return DateTime.fromJSDate(date, { zone: "ist" }).toISO({
			includeOffset: false,
			suppressMilliseconds: true,
		});
	}

};

module.exports = function (eleventyConfig) {
	Object.keys(luxonFunc).forEach((filterName) => {
		eleventyConfig.addFilter(filterName, luxonFunc[filterName])
	});
};