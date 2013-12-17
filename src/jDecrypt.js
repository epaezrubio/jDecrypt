var jDecrypt = function() {
	var that = this
	this.text, 
	that.encryption, 
	that.posibility = {
		spanish: 0,
		german: 0
	}

	String.prototype.replaceAt = function(index, character) {
		return this.substr(0, index) + character + this.substr(index+character.length);
	}

	var setText = function(text) {
		that.text = text.toUpperCase();
	}

	var getLanguage = function(text) {

		var languages = {
			spanish: 0,
			german: 0
		}

		text = text || that.text || "";

		/* SPANISH */

		if (text.match(new RegExp("[Ñ¿¡]"))) {
			return "spanish";
		}

		languages.spanish = languages.spanish + (text.match(new RegExp("[ÁÉÍÓÚÜ]", "g")) || []).length * 3;
		languages.spanish = languages.spanish + (text.match(new RegExp("(?:QU[EI]|ADO|IDO)", "g")) || []).length * 3;

		/* GERMAN */

		if (text.match(new RegExp("ß"))) {
			return "german";
		}

		languages.german = languages.german + (text.match(new RegExp("[ÄÖÜ]", "g")) || []).length * 3;
		languages.german = languages.german + (text.match(new RegExp("(?:SCH|R?AU[FS]|R?EIN|ZU|ÜBER)", "g")) || []).length * 3;

		/* CHECK */
		
		if (languages.spanish > languages.german * 1.5) {
			return "spanish";
		} else if (languages.german > languages.spanish * 1.5) {
			return "german";
		}

		return "unknown"

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

	return {setText:setText, getLanguage:getLanguage, caesar:caesar}
}
