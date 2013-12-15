test("QUnit working", function() {
	ok(true);
})
test("Languaje: Spanish", function() {
	var spanishDecrypt = jDecrypt();
	spanishDecrypt.setText("IPMB, ¿RVF UBM?")
	equal(spanishDecrypt.getLanguage(), "spanish");
	spanishDecrypt.setText("BÑP RVF WJFOF")
	equal(spanishDecrypt.getLanguage(), "spanish");
	spanishDecrypt.setText("IPMB, RVF UBM")
	equal(spanishDecrypt.getLanguage(), "spanish");
})
test("Languaje: German", function() {
	var germanDecrypt = jDecrypt();
	germanDecrypt.setText("FßFO")
	equal(germanDecrypt.getLanguage(), "german");
})
test("Caesar", function() {
	var myDecrypt = jDecrypt();
	equal(myDecrypt.caesar("ABC"), "BCD");
	equal(myDecrypt.caesar("ABC", 2), "CDE");
	equal(myDecrypt.caesar("ABC", 27), "CDE");
	equal(myDecrypt.caesar("ABC", -1), "ZAB");
	equal(myDecrypt.caesar("ABC", 25), "ABC");
	equal(myDecrypt.caesar("ABC", -25), "ABC");
	equal(myDecrypt.caesar("ABC", -50), "ABC");
	equal(myDecrypt.caesar("ABC", -51), "ZAB");
	equal(myDecrypt.caesar("BCD", -1), "ABC");
	equal(myDecrypt.caesar("BCD?", -1), "ABC?");
	equal(myDecrypt.caesar("bce", -1), "ABD");
	equal(myDecrypt.caesar("ace", -1), "ZBD");
})
