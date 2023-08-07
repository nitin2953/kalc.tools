// ({
// 	plugins: ["jsdom-quokka-plugin"],
// 	jsdom: {
// 		"file": "dist/calculators/time/age/index.html"
// 	}
// })

!(()=>{
	const calcForm = document.getElementById("calc-form");
	const calcInputs = calcForm.querySelectorAll("input[type='date']");
	const aInput = calcInputs[0];
	const bInput = calcInputs[1];
	const bday = document.getElementById("bday");
	const age = document.getElementById("age");

	const dateFormat = document.getElementById("date-locale");
	const sysLang = document.getElementById("system-lang");
	dateFormat.textContent = new Date("2003-05-29").toLocaleDateString();
	sysLang.textContent = navigator.language.toUpperCase();
	dateFormat.onclick = () => { aInput.value = "2023-03-09"; bInput.valueAsDate = new Date(); calcAge() };

	bInput.valueAsDate = new Date();


	function dateDiff(date1, date2) {
		return Temporal.Calendar.from('iso8601').dateUntil(
			Temporal.PlainDate.from(date1),
			Temporal.PlainDate.from(date2),
			{ largestUnit: 'year' }
		);
	}

	function checkBDay(a, b) {
		return a.day == b.day && a.month == b.month
	}

	function calcAge() {
		if (calcForm.checkValidity()) {

			const aDate = aInput.valueAsDate;
			const bDate = bInput.valueAsDate;

			const a = {
				year: aDate.getFullYear(),
				month: aDate.getMonth() + 1,
				day: aDate.getDate()
			}
			const b = {
				year: bDate.getFullYear(),
				month: bDate.getMonth() + 1,
				day: bDate.getDate()
			}

			let diff = dateDiff(aInput.value, bInput.value);

			if (checkBDay(a, b)) {
				bday.style.display = "block";
				age.textContent = `Age: ${diff.years} years | ${diff.months} months | ${diff.days} days`;
				return;
			} else bday.style.display = "none";

			if (aInput.valueAsNumber < bInput.valueAsNumber) {
				age.textContent = `Age: ${diff.years} years | ${diff.months} months | ${diff.days} days`;
			} else {
				diff = dateDiff(bInput.value, aInput.value);
				age.textContent = `Will born in ${diff.years} years | ${diff.months} months | ${diff.days} days`;
			}

		}
		else age.textContent = "Age: - years | - months | - days";
	}
	calcInputs.forEach(input => input.addEventListener("input", calcAge));


	function preventSubmit(e) {
		e.preventDefault();
		calcAge();
	}
	calcForm.addEventListener("submit", preventSubmit);
})();