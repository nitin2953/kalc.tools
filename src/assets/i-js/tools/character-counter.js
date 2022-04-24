// ({
// 	plugins: ["jsdom-quokka-plugin"],
// 	jsdom: {
// 		"file": "dist/tools/text/character-counter/index.html"
// 	}
// })

!(()=>{
	const text = document.getElementById('text');
	const output1 = document.getElementById('1');
	const output2 = document.getElementById('2');
	const output3 = document.getElementById('3');
	const output4 = document.getElementById('4');
	const output5 = document.getElementById('5');

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

		// sentence count
		// output5.value = value.split(/[.!?]+./g).filter(Boolean).length;
		// output5.value = value.match(/[.?!…]+./g).length;
		// output5.value = value.replace(/\s/g, ' ').match(/[.?!…]+./g).length;

		// match all sentences with a dot at the end
		// output5.value = value.match(/[.?!…]+./g).length;

		// length of periods with a preceding space and any character
		// output5.value = value.match(/[.?!…]\s+./g).length;

		// match [.?!…] with a preceding space, new line, or end of string
		output5.value = value.match(/[.?!…]\s+|\n|$/g).length; // TODO: Fix this
	}

	text.addEventListener("input", output);
})();
