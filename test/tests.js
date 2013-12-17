test("QUnit working", function() {
	ok(true);
})
test("Languaje: Spanish", function() {
	var spanishDecrypt = jDecrypt();
	spanishDecrypt.setText("IPMB, ¿RVF UBM?", "¿ Character Detection");
	equal(spanishDecrypt.getLanguage(), "spanish");
	spanishDecrypt.setText("BÑP RVF WJFOF", "Ñ Character Detection");
	equal(spanishDecrypt.getLanguage(), "spanish");
	spanishDecrypt.setText("IPMB, RVF UBM", "Spanish Detection");
	equal(spanishDecrypt.getLanguage(), "spanish");
	spanishDecrypt.setText("EN UN LUGAR DE LA MANCHA, DE CUYO NOMBRE NO QUIERO ACORDARME", "Spanish Detection");
	equal(spanishDecrypt.getLanguage(), "spanish");
	spanishDecrypt.setText("DIE LEUTE SPRECHEN ÜBER DAS BUCH", "German Detection");
	equal(spanishDecrypt.getLanguage(), "german");
})
test("Languaje: German", function() {
	var germanDecrypt = jDecrypt();
	germanDecrypt.setText("FßFO");
	equal(germanDecrypt.getLanguage(), "german", "ß Character Detected");
})
test("Caesar", function() {
	var myDecrypt = jDecrypt();
	equal(myDecrypt.caesar("ABC"), "BCD", "Simple Ceasar");
	equal(myDecrypt.caesar("ABC", 2), "CDE", "Custom Shift");
	equal(myDecrypt.caesar("ABC", 27), "CDE", "Shift Loop");
	equal(myDecrypt.caesar("ABC", -1), "ZAB", "Negative Shift");
	equal(myDecrypt.caesar("ABC", 25), "ABC", "Complete Loop");
	equal(myDecrypt.caesar("ABC", -25), "ABC", "Negative Complete Loop");
	equal(myDecrypt.caesar("ABC", -50), "ABC", "Double Loop");
	equal(myDecrypt.caesar("ABC", -51), "ZAB", "Double Negative Loop");
	equal(myDecrypt.caesar("BCD", -1), "ABC", "One Simple More");
	equal(myDecrypt.caesar("BCD?", -1), "ABC?", "Testing Special Chars");
	equal(myDecrypt.caesar("bce", -1), "ABD", "Testing Upper Case");
	equal(myDecrypt.caesar("ace", -1), "ZBD", "Upper Case and Loop");
})
