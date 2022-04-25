---
title: Hamburger Menu With Only CSS or Some JavaScript
seoDesc: Get to know some smart CSS selectors, properties and very basic concepts of vanilla JavaScript by creating a animated hamburger menu with only CSS or some JavaScript
---

When new developers think of making a navigation menu, they imagine a horizontal links inside `<header>` element for desktop and a hamburger menu as the go to solution for mobile, thought they don't. They are not friendly for mobile friendly navigation neither in past present or future on which we will discuse later.
But as a beginner web developer, you **have to know** how to create an intractive element and/or how to animate it. In this article you will learn some lesser known CSS selectors and properties to create a hamburger menu with best practices and some very basic concepts of vanilla JavaScript to make it acceceble for screen readers.

<!-- Such as:

- Aria accessible hamburger menu html structure
- CSS styling add addition styles for animating it & prevent `<body>` from scrolling when the menu is open
- Add event listeners to the menu `<button>` to listen for click events & change classes
-->

Here are some key features that we want in our hamburger menu:
- Responsive to look good on majority of mobile devices
- Accessible for screen readers & keyboard users
- Non janky smooth animation
- Prevent `<body>` from scrolling when the menu is open

## Prerequisites & Discalimer
You will only need basic understanding of html and css to create the hamburger & menu and little "bytes" of JavaScript to make it accecible.


## About the Hamburger Menu

## Creating menu structure

The structure of the menu includes a `<header>` element with a `<nav>` element inside it to make screen reader read then as a navigation area. Then a `<nav>` element with a logo (optional), a `<button>` element to toggle the menu and a `<ul>` element to hold the menu items.

Our HTML will look like below, <abbr title="By The Way">BTW</abbr> this is just the initial structure of the hamburger menu, we will add some more elements and attributes to improve accessibility later.

```html
<header id="site-header">
	<nav>

		<a id="logo" href="/" title="Company Home">
			<img src="/logo.png" alt="Company Logo">
		</a>

		<button id="ham-btn"></button>
		<ul id="menu">
			<li><a href="/">Home</a></li>
			<li><a href="/categories/">Categories</a></li>
			<li><a href="/tags/">Tags</a></li>
			<li><a href="/blog/">Blog</a></li>
		</ul>

	</nav>
</header>
```

\---

## Styling it with CSS


-	First reset and normalize our css.
	```css
	* {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}
	```

- `<header>` should be full width & `<nav>` should be used as `max-width` wrapper to keep everything in center on larger screens.
	```css
	#site-header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 50px;
		background-color: #fff;
		box-shadow: 0 0 20px #3232321a;
		font-size: 20px;
		overflow: hidden;
		z-index: 2;
	}
	```
