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