var jDecrypt = function() {
	var that = this;
	that.text
	that.languaje
	that.encryption

	var setText = function(text) {
		that.text = text;
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

		if (that.text.match(new RegExp("[ß]"))) {
			return "german";
		}

		return "unknown"

	}

	return {setText:setText, getLanguage:getLanguage}
}