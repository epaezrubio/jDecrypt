var jDecrypt = function() {
	var that = this;
	that.text
	that.languaje
	that.encryption

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
		}, matches = 0;
		text = text || that.text || "";

		/* SPANISH */

		if (that.text.match(new RegExp("[Ñ¿¡]"))) {
			return "spanish";
		}

		/* GERMAN */

		if (that.text.match(new RegExp("ß"))) {
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
