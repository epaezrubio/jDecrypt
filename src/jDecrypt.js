var jDecrypt = function() {
	var that = this
	this.text, 
	that.encryption;

	String.prototype.replaceAt = function(index, character) {
		return this.substr(0, index) + character + this.substr(index+character.length);
	}

	var setText = function(text) {
		that.text = text.toUpperCase();
	}

	var getLanguage = function(text) {

		var languages = {
			spanish: 0,
			german: 0,
			english: 0
		}

		text = (text || that.text || "").toUpperCase();

		/* SPANISH */

		if (text.match(new RegExp("[Ñ¿¡]"))) {
			return "spanish";
		}

		languages.spanish = languages.spanish + (text.match(new RegExp("[ÁÉÍÓÚÜ]", "g")) || []).length * 3;
		languages.spanish = languages.spanish + (text.match(new RegExp("(?:\w+ADO|\w+IDO)[ ,.?!]", "g")) || []).length * 3;
		languages.spanish = languages.spanish + (text.match(new RegExp("QU[EI]", "g")) || []).length * 2;

		/* GERMAN */

		if (text.match(new RegExp("ß"))) {
			return "german";
		}

		languages.german = languages.german + (text.match(new RegExp("[ÄÖÜ]", "g")) || []).length * 3;
		languages.german = languages.german + (text.match(new RegExp("(?:SCH|R?AU[FS]|R?EIN|ZU|ÜBER)", "g")) || []).length * 3;

        /* ENGLISH */

        languages.english = languages.english + (text.match(new RegExp("(?: THE | OF | IN )", "g")) || []).length * 4;
        languages.english = languages.english + (text.match(new RegExp("GHT", "g")) || []).length * 3;

		/* CHECK */
		
		var language = l1 = l2 = "unknown";

		for (l in languages) {
			if (languages[l] >= (languages[l1] || 0)) {
				l2 = l1;
				l1 = l;
			}
		}

		if (languages[l1] !== 0 && languages[l1] >= ((languages[l2] * 1.5) || 0)) {
			language = l1;
		}

		return language;

	}

	var caesar = function(text, shift) {
		var upperCaseText = text.toUpperCase() || that.text || "";
		shift = (typeof shift !== "undefined") ? (shift % 25) : 1;
		for (var i = 0; i < upperCaseText.length; i++) {
			var charCode = upperCaseText.charCodeAt(i);
			if (charCode >= 65 && charCode <= 90) {
				if ((charCode + shift) < 65) {
					charCode = charCode + 26;
				}
				upperCaseText = upperCaseText.replaceAt(i, String.fromCharCode(charCode + shift));
			}
		}
		return upperCaseText;
	}

	var base64 = function(input) {
	    var chrKey = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	    var output = "", string = "";
	    var chr1, chr2, chr3;
	    var enc1, enc2, enc3, enc4;
	    var c = c1 = c2 = 0, i = 0;
	    while (i < input.length) {
	        enc1 = chrKey.indexOf(input.charAt(i++));
	        enc2 = chrKey.indexOf(input.charAt(i++));
	        enc3 = chrKey.indexOf(input.charAt(i++));
	        enc4 = chrKey.indexOf(input.charAt(i++));
	        chr1 = (enc1 << 2) | (enc2 >> 4);
	        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
	        chr3 = ((enc3 & 3) << 6) | enc4;
	        output = output + String.fromCharCode(chr1);
	        if (enc3 != 64) {
	            output = output + String.fromCharCode(chr2);
	        }
	        if (enc4 != 64) {
	            output = output + String.fromCharCode(chr3);
	        }
	    }

	    i = 0;
	    while ( i < output.length ) {
	        c = output.charCodeAt(i);
	        if (c < 128) {
	            string += String.fromCharCode(c);
	            i++;
	        }
	        else if((c > 191) && (c < 224)) {
	            c2 = output.charCodeAt(i+1);
	            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
	            i += 2;
	        }
	        else {
	            c2 = output.charCodeAt(i+1);
	            c3 = output.charCodeAt(i+2);
	            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
	            i += 3;
	        }
	    }
	    
	    return string;
	}

	return {setText:setText, getLanguage:getLanguage, caesar:caesar, base64:base64}
}
