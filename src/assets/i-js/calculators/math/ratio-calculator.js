// ({
// 	plugins: ["jsdom-quokka-plugin"],
// 	jsdom: {
// 		"file": "dist/calculators/math/ratio/index.html"
// 	}
// })

!(()=>{
	const calcForm = document.querySelector("#calc-form");
	const calcInputs = calcForm.querySelectorAll('input[type="number"]');
	const a = calcInputs[0];
	const b = calcInputs[1];
	const c = calcInputs[2];
	const x = calcInputs[3];

	const calcEq = document.querySelector("#calc-equation");
	const aEq = calcEq.querySelector("#a-eq");
	const bEq = calcEq.querySelector("#b-eq");
	const cEq = calcEq.querySelector("#c-eq");
	const xEq = calcEq.querySelector("#x-eq");

	const copyBtn = document.getElementById("copy-result");
	const intl = new Intl.NumberFormat(document.documentElement.lang).format;

	function calcRatio() {
		const aVal = a.value;
		const bVal = b.value;
		const cVal = c.value;

		aEq.innerText = aVal ? intl(aVal) : "a";
		bEq.innerText = bVal ? intl(bVal) : "b";
		cEq.innerText = cVal ? intl(cVal) : "c";

		if (calcForm.checkValidity()) {
			const xVal = parseFloat(((bVal / aVal) * cVal).toFixed(2));
			x.value = xVal;
			xEq.innerText = intl(xVal);
		} else {
			x.value = "";
			xEq.innerText = "x";
		}
	}
	calcInputs.forEach(input => input.addEventListener("input", calcRatio));

	function selectResult() {
		this.select();
	}
	x.addEventListener("click", selectResult);

	function copyResult() {
		if (x.value) navigator.clipboard.writeText(x.value);
	}
	copyBtn.addEventListener("click", copyResult);

	function clearForm() {
		a.focus();
		aEq.innerText = "a";
		bEq.innerText = "b";
		cEq.innerText = "c";
		xEq.innerText = "x";
	}
	calcForm.addEventListener("reset", clearForm);

	function preventSubmit(e) {
		e.preventDefault();
		calcRatio();
	}
	calcForm.addEventListener("submit", preventSubmit);

	//

	const swapBtnAB = document.getElementById('swap-ab');
	const swapBtnAC = document.getElementById('swap-ac');

	function swapValue(a, b) {
		[a.value, b.value] = [b.value, a.value];
		calcRatio();
	}
	function swapAB() {
		swapValue(c, x);
		swapValue(a, b);
		c.focus();
		c.select();
	}
	function swapAC() {
		swapValue(b, x);
		swapValue(a, c);
		b.focus();
		b.select();
	}
	swapBtnAB.addEventListener("click", swapAB);
	swapBtnAC.addEventListener("click", swapAC);
})();
