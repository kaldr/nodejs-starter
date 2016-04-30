angular.module('tools', [ 'ngSanitize', 'ui.codemirror' ]);
angular.module('tools').controller("ChangeJSObjectToPHPArray", ChangeJSObjectToPHPArray);

function ChangeJSObjectToPHPArray($scope, $filter) {
	var vm = this;
	vm.jsObject = "{a:1,b:2,c:3,d:[1,3,{a:1,b:'abc'},[1,2,3]],e:{a:1,b:'a',c:undefined}}";
	vm.status = {
		notObject : false
	};
	vm.ObjectToConvert = {};
	vm.phpString = "";
	vm.validObject = validObject;
	vm.changeToPHP = changeToPHP;
	vm.tab = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	vm.jsEditorOptions = {
		mode : "javascript",
		styleActiveLine : true,
		lineNumbers : true,
		lineWrapping : true
	};
	vm.phpEditorOptions = {
		// mode: "application/x-httpd-php",
		// mode: "php",
		//styleActiveLine : true,
		lineNumbers : true,
		lineWrapping : true,

		matchBrackets : true,
		mode : "application/x-httpd-php",
		indentUnit : 4,
		indentWithTabs : true

	};
	vm.tabCount = 0;
	changeToPHP();

	function validObject() {
		try {
			vm.ObjectToConvert = eval("(" + vm.jsObject + ")");
			vm.status.notObject = false;
			console.log(vm.ObjectToConvert);
		} catch (err) {
			vm.status.notObject = true;
		}
	}

	function changeToPHP() {
		vm.phpString = "";
		vm.tabCount = 0;
		vm.validObject();
		PHPFormatObject();
	}

	function PHPFormatObject() {
		for (var i = 0; i < vm.tabCount; i++) {
			vm.phpString += vm.tab;
		}
		if ($.isArray(vm.ObjectToConvert)) {
			vm.phpString += "[<br/>";
			angular.forEach(vm.ObjectToConvert, recursiveTransform);
			vm.phpString += "]<br/>";
		} else if (typeof vm.ObjectToConvert == 'object') {
			vm.phpString += "array(<br/> ";
			angular.forEach(vm.ObjectToConvert, recursiveTransform);
			vm.phpString += ")<br/>";
		}
		vm.phpString = vm.phpString.replace(/,\)/g, ")").replace(/,]/g, "]");
		vm.pureText = "$var=" + vm.phpString.replace(/<br\/>/g, "").replace(/&nbsp;/g, "").replace(/,\)/g, ")").replace(/,]/g, "]");
	}

	function recursiveTransform(toTransform, key, array) {
		vm.tabCount++;
		for (var i = 0; i < vm.tabCount; i++) {
			vm.phpString += vm.tab;
		}
		if ($.isArray(toTransform)) {
			if (typeof key != 'number') {
				vm.phpString += "'" + key + "' => ";
			}
			vm.phpString += "[<br/>";
			angular.forEach(toTransform, recursiveTransform);
			for (var i = 0; i < vm.tabCount; i++) {
				vm.phpString += vm.tab;
			}
			vm.phpString += "],<br/>";
		} else if (typeof toTransform == 'object') {
			if (typeof key != 'number') {
				vm.phpString += "'" + key + "' => ";
			}
			vm.phpString += "array( <br/>";
			angular.forEach(toTransform, recursiveTransform);
			for (var i = 0; i < vm.tabCount; i++) {
				vm.phpString += vm.tab;
			}
			vm.phpString += "),<br/>";
		} else {
			if (!$.isArray(array)) {
				vm.phpString += "'" + key + "' => ";
			}
			if (typeof toTransform == 'undefined' || typeof toTransform == 'null') {
				vm.phpString += "''";
			} else if (typeof toTransform == 'string') {
				vm.phpString += "'" + toTransform + "'";
			} else {
				vm.phpString += toTransform;
			}
			vm.phpString += ",<br/>";
		}
		vm.tabCount--;

	}

	function transformarray(toTransform) {

	}

	function transformObject(toTransform) {

	}
}
