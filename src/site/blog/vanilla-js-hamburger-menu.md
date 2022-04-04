---
title: ☰ Animated hamburger menu inspired by apple.com in vanilla javascript
seoDesc: Get to know some very basic concepts of vanilla javascript by creating a animated hamburger menu inspired by apple.com.
---

Hamburger menus are the got to solution for mobile navigation. They are a great way to show your site visitors that you have a mobile friendly navigation, through which they can access your site. But as a beginner, you might not know how to create a hamburger menu or how to animate it. In this article you will learn to do various things to create a hamburger menu.
Such as:

- Create a aria accessible hamburger menu html structure
- Style it with CSS, add addition styles for animating it & stop `<body>` from scrolling when the menu is open
- Add event listeners to the hamburger menu `<button>` element to listen for click events & change class of hamburger menu

## Prerequisites
You will just need to have a basic understanding of html and css to create a hamburger menu, as you will learn how to open & close it with JavaScript in this article.

## Creating initial menu structure
1. First we will create a `<header>` element with a `<nav>` element inside it.
	```html
	<header id="site-header">
		<nav>
			•••
		</nav>
	</header>
	```
2. Then add some basic elements inside `<nav>` element it such as logo link any CTA buttons.
	```html
	<a id="logo" href="/" title="Company Home"><img src="/logo.png" alt="Company Logo"></a>
	•••
	```
3. At last we will create hamburger menu's `<button>` element & and an `<ul>` menu inside the `<nav>` element after logo anchor.
	```html
	<button id="ham-btn"></button>
	<ul id="menu">
		<li><a href="/">Home</a></li>
		<li><a href="/categories/">Categories</a></li>
		<li><a href="/tags/">Tags</a></li>
		<li><a href="/blog/">Blog</a></li>
	</ul>
	```
This is just the initial structure of the hamburger menu, we will add some more elements (for improving accessibility) to it later.

## Styling it with \*CSS\*

-	```css
	* {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}
	```

- `<header>` should be full width & `<nav>` should be used as `max-width` wrapper to keep everything in center on larger screens.
