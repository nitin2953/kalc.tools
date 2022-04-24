// ({
// 	plugins: ["jsdom-quokka-plugin"],
// 	jsdom: {
// 		"file": "dist/calculators/math/percentage/index.html"
// 	}
// })

!(()=>{
	const calcForm = document.querySelector("#calc-form-1");
	const calcInputs = calcForm.querySelectorAll('input[type="number"]');
	const a = calcInputs[0];
	const b = calcInputs[1];
	const x = calcInputs[2];

	const calcEq = document.querySelector("#calc-equation-1");
	const aEq = calcEq.querySelector("#a-eq");
	const bEq = calcEq.querySelector("#b-eq");
	const xEq = calcEq.querySelector("#x-eq");

	const copyBtn = document.getElementById("copy-result");
	const intl = new Intl.NumberFormat(document.documentElement.lang).format;

	function calcPercent() {
		const aVal = a.value;
		const bVal = b.value;

		aEq.innerText = aVal ? intl(aVal) : "a";
		bEq.innerText = bVal ? intl(bVal) : "b";

		if (calcForm.checkValidity()) {
			aEq.innerText = intl(aVal);
			bEq.innerText = intl(bVal);

			x.value = (aVal / 100) * bVal;
			xEq.innerText = intl(x.value); // big js check is number rounded if yes then add ≈ in front of output
			// OR big js check if number can be roundable then round it with preceeding "≈ "

		} else {
			x.value = "";
			xEq.innerText = "c";
		}
	}
	calcInputs.forEach(input => input.addEventListener("input", calcPercent));

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
		xEq.innerText = "c";
	}
	calcForm.addEventListener("reset", clearForm);

	function preventSubmit(e) {
		e.preventDefault();
		calcPercent();
	}
	calcForm.addEventListener("submit", preventSubmit);
})();
