---
title: SASS Filter & HTMLNano Transform in Eleventy
seoDesc: Know how to configure a SASS filter to inline compiled CSS of external SASS/SCSS files and a HTMLNano transformer to minify final HTML output
---

## Story
I was using a `mailto:` email link at [Kalc Tools Contact page]({{ site.pages.contact.url }}) to let visitors contact me (it was just forwarding emails to my personal gmail using an alias in Cloudflare DNS) but I wanted a proper contact form and don't want to mess around with any external services.

I was missing the feature rich ecosystem of Netlify including its form submission with captcha verification. After some time I thought to just make the contact form hosted on netlify and iframed it in the [contact page]({{ site.pages.contact.url }}) and use postMessage to dynamically adjust the height of iframe as the `<textarea>` grows or window resizes.

In the making of the project I planned to inlined compiled SCSS & JS (a very simple task !), thus making a single http request. But being only a "frontend" JavaScript developer for over a year I always get into trouble, after some hours of try & error I finally figured out the solution: <!-- and write them down below just to get some traffic on this site & make google think that the site is not stale. -->


## SASS Filter
I saw this example of making a [css minification filter](https://www.11ty.dev/docs/quicktips/inline-css/#configuration) on 11ty docs.

```js
// .eleventy.js
const CleanCSS = require("clean-css");
module.exports = function(eleventyConfig) {
	eleventyConfig.addFilter("cssmin", function(code) {
		return new CleanCSS({}).minify(code).styles;
	});
};
```
Then after viewing [SASS documentation](https://sass-lang.com/documentation/js-api#usage) couple of times I found the solution:

```js
// .eleventy.js
const sass = require("sass");
module.exports = function (eleventyConfig) {
	eleventyConfig.addFilter("sass", code => {
		return sass.compileString(code).css.toString();
	});

	...
}
```

**Usage:**

```hbs
{%- raw %}
{% set style1 %}{% include "./style.scss" %}{% endset %}
<style>
	{{ style1 | sass | safe }}
</style>
{% endraw -%}
```

<details>
<summary>⚠ Warning, Don't use this filter if...</summary>
	<p>
		Don't use this filter if you have multiple pages with inlined SCSS, as it will increase the build time.</p>
	<p>
		Instead you can make a separate folder for SCSS files, keeping same folder structure like pages (for discoverability), compiling them before running 11ty (with gulp, npm scripts or anything else) and making reference to the compiles CSS files in your pages {% raw %}`{% include "complied/css/page1.css" %}`{% endraw %} tags.
	</p>
</details>

## HTMLNano Transform
I was using [html-minifier-terser](https://github.com/terser/html-minifier-terser) to minify HTML only in prodcution but just thought to use [htmlnano](https://github.com/posthtml/htmlnano) in this project.

```js
const htmlnano = require("htmlnano");
const options = {
	...
}

module.exports = function (eleventyConfig) {
	...

	eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
		return htmlnano.process(content, options).then(result => { return result.html }).catch(err => { console.error(err) });
	});

	...
}
```
Note that in order to minify HTML along with inlined CSS & JS you have to install `cssnano`(& `postcss`) & `terser` separately.

If it helps you then share it or re/tweet it (or just give me a backlink :) ).