---
title: What are Bookmarklets ? How to create & use them ?
seoDesc: Bookmarklets are browser bookmarks that execute JavaScript code instead of navigating to a new page.
---

<dfn>Bookmarklets</dfn> are browser bookmarks that execute JavaScript code instead of navigating to a new page. They are also known as "applets", "favlets", and "javascript bookmarklets". They often used to add additional functionality to browsers.

## What a bookmarklet can do?
Since bookmarklets are JavaScript code, their possibilities are endless, they can do pretty much anything that you can imagine within the browser context.

### For a normal user
They can do various things like:

- Find & show all links of available video, audio, image, and other files.
- Download video or convert them to audio from YouTube, Dailymotion, Vimeo and other sites.
- Search current product on Flipkart, Amazon, eBay, and other sites.
- Convert currency to your preffered currency.
- Search current query on other serches engines.
- Search previous version of page on Internet Archive.
- Share the page on any social network.
- Generate QR code from the page.
- Remove all ads from a page or simplify the page layout for better reading.
- Makes tables on any page sortable.
- Automate form filling & submiting, button clicking or any repetitive tasks.
- Add button to show hide password fields.
- Hack forms and lift up the limitation of form submission.
- Toggle All checkboxes.
- Modify anything on the page or add ability edit the page yourself.
- Enable text selection.
- Download all images in their higest possible quality.
- Reverse search any image on sites like [tineye.com](https://tineye.com/search?url=https://kalc.tools/assets/images/logo.svg) and [google.com/<wbr>searchbyimage](https://www.google.com/searchbyimage?&image_url=https://kalc.tools/assets/images/logo.svg).
- Count words in whole page, selected text or only article.
- Change favicon, title, text color, background color, fonts, size, etc.
- Add your own custom elements & custom CSS styles to the page.

### For a developer
They can do much more a developer can think of, including:

- Show console logs on your mobile device.
- Execute JavaScript code on your mobile device.
- Reload CSS.
- Clear page cache.
- Scroll to the bottom on infinite loading pages.
- Check what a website is built with.
- Analyze the page on online tools like Lighthouse, Pingdom, GTmetrix, etc.
- See meta information of the page.
- Identify fonts used on pages or tweak them live.
- Validate HTML.
- Check which images don't hav a alt attribute.
- Get you IP Address.

## How to create a bookmarklet
Bookmarklets are fairly easy to create if you know how JavaScript code works. But if you are just a normal user, you can also create a bookmarklet by following these steps:{# refer to this guide [kalc.tools/resources/guides/bookmakrlets] #}

### First lets see how a bookmarklet looks like
A bookmarklet can be as simple as `javascript:alert(document.url)` or as complex as below.

```javascript
/* Unminified */
javascript:
	!(function(){
		alert(document.url);
	})();

/* Minified */
javascript:!(function(){alert(document.url);})();


/* Minified with ES6 arrow function */
javascript:!(()=>{alert(document.url);})();
```

1. <dfn>`javascript:`</dfn> it is a protocol similar to `http:` or `https:`, which tell the browser to treat words after it as JavaScript code not a page hyperlink.

2. `!(function(){...})()` is a function declaration inside a <abbr title="Immediately-Invoked Function Expression">IFEE</abbr> and a <dfn>`!`</dfn> exclamation mark at the beginning, it has many characteristics:
	1. <dfn>`function(){...}`</dfn> a function declaration just declare a function, it will not execute it until it is called (more below). A function without a name is called anonymous function. It can only be executed/called within an IFEE expression, when stored as a variable or a property of an object.
	2. <dfn>`(...)()`</dfn> IFEE which stand for [Immediately-Invoked Function Expression](https://developer.mozilla.org/en-US/docs/Glossary/IIFE), used to execute the code inside it as soon as it is defined/declared.
	3. `!` since the above IFEE expression return undefined when ran standalone, we use `!` exclamation mark at the beginning to invert it as `true`.

3. The `function(){...}` can be further minified using ES6 arrow function to be like `() => {...}`, there are some [limitations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#:~:text=Differences%20%26%20Limitations%3A) with arrow funciton, so we use a legacy function declaration instead.

4. At last <dfn>`;`</dfn> semi colon is used to tell the browser that one statement is finished (so that it don't mess up with next statement). You will have to use it after every statement inside the function.

### Writing functions & expression
A expression/statement can be understood by the examples below.

**First open your Browser DevTools's Console by:**
- Right clicking anywhere on the page and select "Inspect Element" then click "Console" at top
- Keyboard shortcut:
	<kbd>Cmd/Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>i</kbd> for "Inspect Element" OR
	<kbd>Cmd/Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>j</kbd> for directly opening "Console"
- Click three dots at the top right corner of the browser window -> "More Tools" -> "Developer Tools"

Expression example (run one by one but not `//` comment):
```javascript
1+2
// 3

4*5
// 20

22/7
// 3.142857142857143

location.href
// "https://kalc.tools/blog/bookmarklets/"

document.title
// "What are Bookmarklets ? How to create & use them ?"
```

A function is a block of code that can execute any number of expressions/statement and other functions.

Example of a expression/statement:
