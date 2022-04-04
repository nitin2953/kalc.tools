const html = document.documentElement;
const head = document.head;
const body = document.body;

/* document.fonts.ready.then(function() {
	if (document.fonts.check("1em Inter")) html.classList.add("fonts-loaded");
}); */


// make a debounce function
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this,
			args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

const pre = document.querySelectorAll("pre");

function log() {
	pre.forEach(el => {
		if (el.scrollHeight > el.offsetHeight || el.scrollWidth > el.offsetWidth) {
			el.setAttribute("tabindex", "0");
		} else {
			el.removeAttribute("tabindex");
		}
	});
	console.log("resizing");
}
log();
window.addEventListener("resize", debounce(log, 500));
