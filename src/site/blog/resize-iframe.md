---
title: How to resize a cross-origin & same-origin iframe
seoDesc: Resize any origin's iframe with browser native APIs, without messing arround hacks.
---

You can't make iframe's height or width dynamic with CSS values like `max-content, auto, 100%`, beacause it is an replaced element making it out of the scope of CSS.
But JavaScript can access iframe's window object & document **(only on same-origin)** using [`contentWindow`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/contentWindow) & [`contentDocument`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/contentDocument) properties, which we can use to maniplate iframe & it's content like a normal html page or element, for example, resize iframe width and height when it's content grow or shrink.


We will use `ResizeObserver` on iframe's `<html>` element beacause `resize` event on window only fired when browser window or viewport resizes, it is not fired if content within `<html>` change or resize and unlike `resize` event an advantage of `ResizeObserver` is that it won't fire continuously and never make pressure on main thread, keeping your site responsive.
But a cavet of `ResizeObserver` is that it will round values to nearest integer, so there might be some situation where iframe's scrollbar will be visible just to scroll 1px, to get rid of it you should add 1px to `iframeHeight` variable.


## Resize Same Origin iframe
Just get full height (`scrollHeight`) of iframe's body and set it as iframe's height. Note that `scrollHeight` and other length related properties of any element return value as number & style property only accept number with unit (px, em, rem, %, etc), so we are manually adding `px` at the end to set iframe height.

```html
<iframe id="iframe" src="https://kalc.tools" style="width: 100%; border: none;"></iframe>
```

```js
const iframe = document.getElementById('iframe');

function resizeIFrame(e) {
	const iframeHeight = iframe.contentWindow.document.body.scrollHeight;
	iframe.style.height = iframeHeight + "px";
}

// iframe.onload = resizeIFrame;
iframe.addEventListener("load", resizeIFrame);

const resizeObserver = new ResizeObserver(resizeIFrame);
resizeObserver.observe(iframe);
```

The `resizeIFrame()` function will only run once when iframe & its resources loading is compreleted, but it will not run again when iframe's content is changed, it's parent element/page is resized or device orientation changed. To make it run again, we can use `iframe.contentWindow.addEventListener('resize', resizeIFrame)`.


## Resize Cross Origin iframe
**Communicating with cross origin iframe is only possible if you have access to iframe source code.**

As we can't access content of a cross origin iframe beacause of security policy, we will use [`postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) in iframe to send updated width/height to its parent window and in parent window we will use [`onmessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/onmessage) to receive updated width/height from iframe and set it as iframe's height.

```html
<iframe id="iframe" src="https://example.com" style="width: 100%; border: none;"></iframe>
```

-	**iframe**:
	```javascript
	const pageOrigin = "https://kalc.tools/blog/resize-iframes/";
	// ⚠ Use *Full URL* of parent page in which iframe is located INCLUDING TRAILING SLASH (IF ANY)

	function sendHeight() {
		window.parent.postMessage({
			iframeHeight: document.documentElement.offsetHeight,
		}, pageOrigin); // ⚠ NEVER USE "*" IN PRODUCTION
	}

	const resizeObserver = new ResizeObserver(sendHeight);
	resizeObserver.observe(document.documentElement);
	```

-	**parent window**:
	```javascript
	const iframe = document.querySelector("iframe");
	const iframeOrigin = "https://example.com";
	// ⚠ Use *origin* (domain name) of iframe EXCLUDING TRAILING SLASH (IF ANY)

	window.addEventListener("message", (e) => {
		if (e.origin === iframeOrigin && Number.isInteger(e.data.iframeHeight)) {
			iframe.style.height = e.data.iframeHeight + "px";
		}
	});
	```
For extra security, here in parent page we are checking if message is coming from our specified origin and is message a number or not.
