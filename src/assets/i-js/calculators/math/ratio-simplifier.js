// ({
// 	plugins: ["jsdom-quokka-plugin"],
// 	jsdom: {
// 		"file": "dist/calculators/math/ratio-simplifier/index.html"
// 	}
// })

!(()=>{
	const calcForm = document.querySelector("#calc-form");
	const calcInputs = calcForm.querySelectorAll('input[type="number"]');
	const a = calcInputs[0];
	const b = calcInputs[1];
	const x = calcInputs[2];
	const y = calcInputs[3];

	const calcEq = document.querySelector("#calc-equation");
	const aEq = calcEq.querySelector("#a-eq");
	const bEq = calcEq.querySelector("#b-eq");
	const xEq = calcEq.querySelector("#x-eq");
	const yEq = calcEq.querySelector("#y-eq");
	const gcfEq = calcEq.querySelectorAll(".gcf-eq");

	const copyBtn = document.getElementById("copy-result");
	const intl = new Intl.NumberFormat(document.documentElement.lang).format;

	function reduce(numerator, denominator) {
		let n = numerator * 1000;
		let d = denominator * 1000;

		let gcf = function gcf(a,b){
			return b ? gcf(b, a % b) : a;
		};

		gcf = gcf(n,d);
		n = ((n / gcf) / 1000) * 1000;
		d = ((d / gcf) / 1000) * 1000;
		gcf = gcf / 1000;

		return [n, d, gcf];
	}

	function calcRatio() {
		const aVal = a.value;
		const bVal = b.value;

		aEq.innerText = aVal ? intl(aVal) : "a";
		bEq.innerText = bVal ? intl(bVal) : "b";

		if (calcForm.checkValidity()) {
			let sR = reduce(aVal,bVal);

			aEq.innerText = intl(aVal);
			bEq.innerText = intl(bVal);
			gcfEq.forEach(eq => eq.innerText = intl(sR[2]));

			x.value = sR[0];
			xEq.innerText = intl(sR[0]);
			y.value = sR[1];
			yEq.innerText = intl(sR[1]);
		} else {
			gcfEq.forEach(eq => eq.innerText = "GCF");

			x.value = "";
			xEq.innerText = "x";
			y.value = "";
			yEq.innerText = "y";
		}
	}
	calcInputs.forEach(input => input.addEventListener("input", calcRatio));

	function selectResult() {
		this.select();
	}
	x.addEventListener("click", selectResult);
	y.addEventListener("click", selectResult);

	function copyResult() {
		if (x.value && y.value) {
			navigator.clipboard.writeText(x.value + ":" + y.value);
		}
	}
	copyBtn.addEventListener("click", copyResult);

	function clearForm() {
		a.focus();
		aEq.innerText = "a";
		bEq.innerText = "b";
		xEq.innerText = "x";
		yEq.innerText = "y";
		gcfEq.forEach(eq => eq.innerText = "GCF");
	}
	calcForm.addEventListener("reset", clearForm);

	function preventSubmit(e) {
		e.preventDefault();
		calcRatio();
	}
	calcForm.addEventListener("submit", preventSubmit);

	//

	const swapBtnAB = document.getElementById('swap-ab');
	// const swapBtnAC = document.getElementById('swap-ac');

	function swapValue(a, b) {
		[a.value, b.value] = [b.value, a.value];
		calcRatio();
	}
	function swapAB() {
		swapValue(a, b);
		// copyBtn.focus();
	}
	swapBtnAB.addEventListener("click", swapAB);
})();