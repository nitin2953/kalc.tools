// ({
// 	plugins: ["jsdom-quokka-plugin"],
// 	jsdom: {
// 		"file": "dist/tools/text/character-counter/index.html"
// 	}
// })

!(()=>{
	const text = document.getElementById('text');
	const output1 = document.getElementById('result-1');
	const output2 = document.getElementById('result-2');
	const output3 = document.getElementById('result-3');
	const output4 = document.getElementById('result-4');

	function output() {
		value = text.value;

		// output text length
		output1.value = value.length;

		// output text length without more than 1 space between words
		output2.value = value.replace(/\s+/g, ' ').length;

		// output word count without conuting spaces
		output3.value = value.split(/\s+/).filter(Boolean).length;

		// paragraph count without empty lines
		output4.value = value.split(/\n/).filter(line => line.trim()).length;
	}

	text.addEventListener("input", output);
})();
