const html = document.documentElement;
const head = document.head;
const body = document.body;

/* document.fonts.ready.then(function() {
	if (document.fonts.check("1em Inter")) html.classList.add("fonts-loaded");
}); */


function debounce(callback, delay) {
	let timeout;
	return (...args) => {
		const context = this;
		clearTimeout(timeout);
		timeout = setTimeout(() => callback.apply(context, args), delay);
	};
}


const code = document.querySelectorAll("pre > code");

if (code.length > 0) {
	const resizeObserver = new ResizeObserver(entry => {
		entry.forEach( e => {
			if (e.target.scrollWidth > e.target.offsetWidth) {
				e.target.setAttribute("tabindex", "0")
			} else e.target.removeAttribute("tabindex");
		});
	});
	code.forEach(c => resizeObserver.observe(c));
}
