(function(mod) {
	if (typeof exports == "object" && typeof module == "object") // CommonJS
		mod(require("../../lib/codemirror"));
	else if (typeof define == "function" && define.amd) // AMD
		define(["../../lib/codemirror"], mod);
	else // Plain browser env
		mod(CodeMirror);
})(function(CodeMirror) {
	"use strict";
 
	CodeMirror.registerHelper("hint", "clike", function(cm) {
		var cur = cm.getCursor(),
			token = cm.getTokenAt(cur);
		var inner = CodeMirror.innerMode(cm.getMode(), token.state);
		//自动补全
		var javaHint = ['abstract', 'assert', 'break', 'boolean', 'byte', 'case', 'catch',
						'char', 'class', 'const', 'continue', 'default', 'do', 'double',
						'else', 'enum', 'extends', 'final', 'finally', 'float', 'for',
						'goto', 'if', 'boolean', 'implements', 'import', 'instanceof', 'int',
						'interface', 'long', 'native', 'new', 'package', 'private', 'protected',
						'public', 'return', 'short', 'static', 'strictfp', 'super', 'switch',
						'synchronized', 'this', 'throw', 'throws', 'transient', 'try', 'void',
						'volatile', 'while', 'true', 'false', 'Object', 'Integer', 'String',
						'Double', 'Boolean','null','object','override',"()->{}",'->'];
		
		var kotlinHint = ['abstract', 'assert', 'break', 'boolean', 'byte', 'case', 'catch',
						'char', 'class', 'const', 'continue', 'default', 'do', 'double',
						'else', 'enum', 'extends', 'final', 'finally', 'float', 'for',
						'goto', 'if', 'boolean', 'implements', 'import', 'instanceof', 'int',
						'interface', 'long', 'native', 'new', 'package', 'private', 'protected',
						'public', 'return', 'short', 'static', 'strictfp', 'super', 'switch',
						'synchronized', 'this', 'throw', 'throws', 'transient', 'try', 'void',
						'volatile', 'while', 'true', 'false', 'Object', 'Integer', 'String',
						'Double', 'Boolean','forSome','implicit','lazy','macro','match','override',
						'sealed','trait','type','val','var','let',"()->{}",'->'];
		var scalaHint = ['abstract', 'assert', 'break', 'boolean', 'byte', 'case', 'catch',
						'char', 'class', 'const', 'continue', 'default', 'do', 'double',
						'else', 'enum', 'extends', 'final', 'finally', 'float', 'for',
						'goto', 'if', 'boolean', 'implements', 'import', 'instanceof', 'int',
						'interface', 'long', 'native', 'new', 'package', 'private', 'protected',
						'public', 'return', 'short', 'static', 'strictfp', 'super', 'switch',
						'synchronized', 'this', 'throw', 'throws', 'transient', 'try', 'void',
						'volatile', 'while', 'true', 'false', 'Object', 'Integer', 'String',
						'Double', 'Boolean','forSome','implicit','lazy','macro','match','override',
						'sealed','trait','type','val','var','yield','_',':','=','=>','<-','<:',
						'<%','>:','#','@',"()->{}",'->'];
		var 	 dis = ['boolean', 'boolean', 'boolean', 'boolean', 'boolean',
						, 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean',
						, 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean',
						, 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean',
						, 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean',
						, 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean',
						, 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean',
						, 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean',
						, 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean',
						, 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean',
						, 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean',
						, 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean',
						, 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean',
						, 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean']
		var start = token.start,
			end = cur.ch
		var str = token.string
		var HintList = [];
		if (inner.mode.helperType == "text/x-java"){
			HintList = javaHint;
		}else if (inner.mode.helperType == "text/x-kotlin") {
			HintList = kotlinHint;
		}else if (inner.mode.helperType == "text/x-scala") {
			HintList = scalaHint;
		}else {
			return;
		}
		var list = javaHint.filter(function(item) {
			return item.indexOf(str) === 0
		})
		 
		if (list.length) return {
			list: list,
			from: CodeMirror.Pos(cur.line, start),
			to: CodeMirror.Pos(cur.line, end)
		};
		
	});
 
});