// ({
// 	plugins: ["jsdom-quokka-plugin"],
// 	jsdom: {
// 		"file": "dist/tools/character-counter/index.html"
// 	}
// })

!(()=>{

	const text = document.getElementById('text');
	const output1 = document.getElementById('result-1');
	const output2 = document.getElementById('result-2');
	const output3 = document.getElementById('result-3');
	const output4 = document.getElementById('result-4');

	// output text length
	function textLength() {
		output1.value = text.value.length;
	}

	// output text length without more than 1 space between words
	function textLengthWithoutWhitespace() {
		output2.value = text.value.replace(/\s+/g, ' ').length;
	}

	// output word count without conuting spaces
	function wordCount() {
		output3.value = text.value.split(/\s+/).filter(Boolean).length;
	}

	// paragraph count without empty lines
	function paragraphCountWithoutEmptyLines() {
		output4.value = text.value.split(/\n/).filter(line => line.trim()).length;
	}

	function runAll() {
		console.log("running");
		textLength();
		textLengthWithoutWhitespace();
		wordCount();
		paragraphCountWithoutEmptyLines();
	}

	text.addEventListener("input", runAll);

})();
