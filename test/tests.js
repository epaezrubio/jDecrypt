test("QUnit working", function() {
	ok(true);
})
test("Languaje: Spanish", function() {
	var spanishDecrypt = jDecrypt();
	spanishDecrypt.setText("IPMB, ¿RVF UBM?");
	equal(spanishDecrypt.getLanguage(), "spanish", "¿ Character Detection");
	spanishDecrypt.setText("BÑP RVF WJFOF");
	equal(spanishDecrypt.getLanguage(), "spanish", "Ñ Character Detection");
	spanishDecrypt.setText("IPMB, RVF UBM");
	equal(spanishDecrypt.getLanguage(), "unknown", "Spanish Detection");
	spanishDecrypt.setText("EN UN LUGAR DE LA MANCHA, DE CUYO NOMBRE NO QUIERO ACORDARME");
	equal(spanishDecrypt.getLanguage(), "spanish", "Spanish Detection");
	spanishDecrypt.setText("LA DEL ALBA SERÍA CUANDO DON QUIJOTE SALIÓ DE LA VENTA, TAN CONTENTO, TAN GALLARDO, TAN ALBOROZADO POR VERSE YA ARMADO CABALLERO, QUE EL GOZO LE REVENTABA POR LAS CINCHAS DEL CABALLO. MAS, VINIÉNDOLE A LA MEMORIA LOS CONSEJOS DE SU HUÉSPED CERCA DE LAS PREVENCIONES TAN NECESARIAS QUE HABÍA DE LLEVAR CONSIGO, ESPECIAL LA DE LOS DINEROS Y CAMISAS, DETERMINÓ VOLVER A SU CASA Y ACOMODARSE DE TODO, Y DE UN ESCUDERO, HACIENDO CUENTA DE RECEBIR A UN LABRADOR VECINO SUYO.");
	equal(spanishDecrypt.getLanguage(), "spanish", "Spanish Long Text Detection");
})
test("Languaje: German", function() {
	var germanDecrypt = jDecrypt();
	germanDecrypt.setText("FßFO");
	equal(germanDecrypt.getLanguage(), "german", "ß Character Detected");
	germanDecrypt.setText("DIE LEUTE SPRECHEN ÜBER DAS BUCH");
	equal(germanDecrypt.getLanguage(), "german", "German Detection");
})
test("Caesar", function() {
	var myDecrypt = jDecrypt();
	equal(myDecrypt.caesar("ABC"), "BCD", "Simple Ceasar");
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
test("Base64", function() {
	var myDecrypt = jDecrypt();
	equal(myDecrypt.base64("Q2Fuc8Ozc2UgZWwgbW96bw=="), "Cansóse el mozo");
	equal(myDecrypt.base64("4oCUIEltcG9ydGEgZXNvIHBvY28g4oCUcmVzcG9uZGnDsyBkb24gUXVpam90ZeKAlCwgcXVlIEhhbGR1ZG9zIHB1ZWRlIGhhYmVyIGNhYmFsbGVyb3M7IGN1YW50byBtw6FzLCBxdWUgY2FkYSB1bm8gZXMgaGlqbyBkZSBzdXMgb2JyYXMu"), "— Importa eso poco —respondió don Quijote—, que Haldudos puede haber caballeros; cuanto más, que cada uno es hijo de sus obras.");
})
test("Languaje: English", function() {
    var englishDecrypt = jDecrypt();
    englishDecrypt.setText("THE TWO JAILED MEMBERS OF THE PUNK GROUP PUSSY RIOT AND 30 MEMBERS OF A GREENPEACE CREW AWAITING TRIAL IN ST PETERSBURG WERE GRANTED AMNESTY TODAY AND WILL BE FREE AS SOON AS THEIR PAPERWORK IS COMPLETE.");
    equal(englishDecrypt.getLanguage(), "english", "English Detection");
})