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
	germanDecrypt.setText("DIE LEUTE SPRECHEN ÜBER DAS BUCH 'QUE PASA'");
	equal(germanDecrypt.getLanguage(), "unknown", "Unknown Case Due to Tolerance");
})
test("Languaje: English", function() {
    var englishDecrypt = jDecrypt();
    englishDecrypt.setText("THE TWO JAILED MEMBERS OF THE PUNK GROUP PUSSY RIOT AND 30 MEMBERS OF A GREENPEACE CREW AWAITING TRIAL IN ST PETERSBURG WERE GRANTED AMNESTY TODAY AND WILL BE FREE AS SOON AS THEIR PAPERWORK IS COMPLETE.");
    equal(englishDecrypt.getLanguage(), "english", "English Detection");
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
test("Binary", function() {
	var myDecrypt = jDecrypt();
	equal(myDecrypt.binary("01000101 01100001 01110011 01111001 00100000 01110100 01100101 01111000 01110100"), "Easy text");
	equal(myDecrypt.binary("010101000110100001101001011100110010000001101001011100110010000001100001001000000110110001101111011011100110011101100101011100100010000001110100011001010111100001110100"), "This is a longer text");
})
test("Hexadecimal", function() {
	var myDecrypt = jDecrypt();
	equal(myDecrypt.hexadecimal("45 61 73 79 20 74 65 78 74"), "Easy text");
	equal(myDecrypt.hexadecimal("4  5 6   1    73 7    9 20 74    6  5    78   74"), "Easy text");
	equal(myDecrypt.hexadecimal("546869732069732061206c6f6e6765722074657874"), "This is a longer text");
})
test("Encryption Detection", function() {
	var myDecrypt = jDecrypt();
	equal(myDecrypt.getEncryption("QBSBOPJB, FTUBEP NFOUBM QBUPMÓHJDP FO FM RVF FM QBDJFOUF TVGSF EFMJSJPT"), "caesar", "Caesar Encryption Detection");
	equal(myDecrypt.getEncryption("TEVERSME, IWXEHS QIRXEP TEXSPÓKMGS IR IP UYI IP TEGMIRXI WYJVI HIPMVMSW"), "caesar", "Caesar Encryption Detection 2");
	equal(myDecrypt.getEncryption("UGFyYW5vaWEsIGVzdGFkbyBtZW50YWwgcGF0b2zzZ2ljbyBlbiBlbCBxdWUgZWwgcGFjaWVudGUgc3VmcmUgZGVsaXJpb3M="), "base64", "Base64 Encryption Detection");	
	equal(myDecrypt.getEncryption("VEVWRVJTTUUsIElXWEVIUyBRSVJYRVAgVEVYU1DTS01HUyBJUiBJUCBVWUkgSVAgVEVHTUlSWEkgV1lKVkkgSElQTVZNU1c"), "base64", "Base64 Encryption Detection 2");
	equal(myDecrypt.getEncryption("48 6f 6c 61 20 71 75 65 20 74 61 6c 20 73 6f 79 20 63 6f 6c 6f 73 61 6c"), "hexadecimal", "Hexadecimal");	
	equal(myDecrypt.getEncryption("4c4120454c20414c424120534552cd41"), "hexadecimal", "Hexadecimal 2");
	equal(myDecrypt.getEncryption("01001000 01001111 01001100 01000001"), "binary", "Binary");	
	equal(myDecrypt.getEncryption("011101000111001101101000111111000111001101110011 "), "binary", "Binary 2");
})
