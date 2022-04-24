// ({
// 	plugins: ["jsdom-quokka-plugin"],
// 	jsdom: {
// 		"file": "dist/tools/text/case-converter/index.html"
// 	}
// })

!(()=>{
	const text = document.getElementById("text");
	const buttons = [...document.getElementById("button-wrapper").children];
	const copyBtn = document.getElementById("copy-result");

	function changeCase() {
		switch (this.id) {
			case "title": return text.value = text.value.toLowerCase().replace(/\b[a-z]/g, (letter) => {	return letter.toUpperCase() });
			case "sentence": return text.value = text.value.toLowerCase().replace(/(^\w{1}|\.\s*\w{1})/gi, (letter) => { return letter.toUpperCase() });
			case "upper": return text.value = text.value.toUpperCase();
			case "lower": return text.value = text.value.toLowerCase();
			case "camel": return text.value = text.value.toLowerCase().replace(/\s+/g, ' ').replace(/\s(.)/g, (match, letter) => { return letter.toUpperCase() });
			case "pascal": return text.value = text.value.toLowerCase().replace(/\s+/g, ' ').replace(/\s(.)/g, (match, letter) => { return letter.toUpperCase() }).replace(/\b(.)/g, (match, letter) => { return letter.toUpperCase() });
			case "snake-u": return text.value = text.value.toUpperCase().replace(/\s+/g, '_');
			case "snake-l": return text.value = text.value.toLowerCase().replace(/\s+/g, '_');
			case "kebab-u": return text.value = text.value.toUpperCase().replace(/\s+/g, '-');
			case "kebab-l": return text.value = text.value.toLowerCase().replace(/\s+/g, '-');
		}
	}
	buttons.forEach(button => button.addEventListener("click", changeCase));

	function copyResult() {
		if (text.value) navigator.clipboard.writeText(text.value);
	}
	copyBtn.addEventListener("click", copyResult);
})();
