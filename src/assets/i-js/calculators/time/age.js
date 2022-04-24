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
	dateFormat.textContent = new Date().toLocaleDateString(); //
	dateFormat.onclick = ()=>{ aInput.value = "2022-02-28"; bInput.value = "2022-04-01"; calcAge() }; //

	bInput.valueAsDate = new Date();

	function daysInMonth(month, year) {
		return new Date(year, month, 0).getDate();
  	}


	function calcAge() {
		if (calcForm.checkValidity()) {

			const aDate = aInput.valueAsDate; // DOB
			const bDate = bInput.valueAsDate; // Today

			if (aDate > bDate) { age.textContent = "NOT BORN YET"; return; }

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


			let diffYear, diffDay, diffMonth;

			diffYear = b.year - a.year;

			if (a.day <= b.day) diffDay = b.day - a.day;
			// else if (a.day < b.day) {
			// 	b.day = b.day + 31;
			// 	diffDay = b.day - a.day;
			// 	b.month = b.month - 1;
			// 	console.log("else if 1");
			// }
			// else if (a.day > b.day && a.month < b.month) {
			// 	b.day = b.day + daysInMonth(a.month, a.year);
			// 	diffDay = b.day - a.day;
			// 	b.month = b.month - 1;
			// 	console.log("else if 2");
			// }
			else {
				// b.day = b.day + 31;
				b.day = b.day + daysInMonth(a.month, a.year);
				diffDay = b.day - a.day;
				b.month = b.month - 1;
				// diffMonth = diffMonth - 1;
				// diffMonth = 11;
				// diffYear = diffYear - 1;
				console.log("else");
			}

			if (a.month <= b.month) diffMonth = b.month - a.month;
			else {
				b.month = b.month + 12;
				diffMonth = b.month - a.month;
				diffYear = diffYear - 1;
			}
			console.log(diffYear);


			// Birthday
			if (a.day == b.day && a.month == b.month) {
				bday.style.display = "block";
				age.textContent = `Age: ${diffYear} years, ${diffMonth} months, ${diffDay} days`;
				return;
			} else bday.style.display = "none";


			age.textContent = `Age: ${diffYear} years, ${diffMonth} months, ${diffDay} days`;

		} else age.textContent = "Age: - years | - months | - days";
	}
	calcInputs.forEach(input => input.addEventListener("input", calcAge));


	function preventSubmit(e) {
		e.preventDefault();
		calcAge();
	}
	calcForm.addEventListener("submit", preventSubmit);
})();