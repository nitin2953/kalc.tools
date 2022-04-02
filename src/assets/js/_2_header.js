const checkbox = document.getElementById("mob-menu");
const header = document.getElementById("site-header");
const cButton = header.getElementsByTagName("button")[0];
const headerLinks = header.querySelectorAll("a");


const mobMenuOpen = new Event("mob-menu-open");
const mobMenuClose = new Event("mob-menu-close");


function checkboxChecked(state = false) {
	checkbox.checked = state;
	checkbox.dispatchEvent(new Event("change"));
}

function cButtonHandler() {
	checkboxChecked(!checkbox.checked);
}
cButton.addEventListener("click", cButtonHandler);

function checkboxChangeHandler() {
	checkbox.dispatchEvent(checkbox.checked ? mobMenuOpen : mobMenuClose);
}
checkbox.addEventListener("change", checkboxChangeHandler);
checkbox.addEventListener("mob-menu-open", menuOpenHandler);
checkbox.addEventListener("mob-menu-close", menuCloseHandler);


const mediaQuery = window.matchMedia("(min-width: 701px)");
function mediaQueryHandler(e) {
	if (e.matches) checkboxChecked();
}



const mediaQueryO = window.matchMedia("(max-height: 320px)");
function mediaQueryOHandler(e) {
	if (checkbox.checked && e.matches) window.scrollTo({top: 0});
}
// when hiding header on scroll => trigger it on orientation change --> then only remove class if any input is focused


function escapeHandler(e) {
	if (e.key === "Escape") {
		checkboxChecked();
		cButton.focus();
	}
}


function menuOpenHandler() {
	cButton.textContent = "Close menu";
	html.classList.add("mob-menu-open");
	mediaQuery.addEventListener("change", mediaQueryHandler);
	mediaQueryOHandler(mediaQueryO);
	header.addEventListener("keydown", escapeHandler);
	headerLinks.forEach((a) => a.addEventListener("click", cButtonHandler));
}

function menuCloseHandler() {
	cButton.textContent = "Open menu";
	html.classList.remove("mob-menu-open");
	mediaQuery.removeEventListener("change", mediaQueryHandler);
	header.removeEventListener("keydown", escapeHandler);
	headerLinks.forEach((a) => a.removeEventListener("click", cButtonHandler));
}
