function showCode() {
	if (flag) {
		$('.code-section-container').toggleClass('show-code');
		$("#h6Test").css("display", "none");
		$(".CodeMirror").css("display", "none");
		$("#selectTheme").css("display", "none");
		$("#selectFormat").css("display", "none");
		$("#selectLength").css("display", "none");
		$("#submitCode").css("display", "none");
		$("#runCode").css("display", "none");
		$("#tips").css("display", "none");
		flag = false;
	} else {
		if (editorFlag) {
			editor = CodeMirror.fromTextArea(document.getElementById("code"), {
				value: "请选择一个文件！",
				//mode: "text/groovy", //实现groovy代码高亮
				mode: "text/x-sql", //实现Java代码高亮
				lineNumbers: true, //显示行号
				theme: "idea", //设置主题
				lineWrapping: true, //代码折叠
				foldGutter: true,
				lineWrapping: false,
				gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
				matchBrackets: true, //括号匹配
				//readOnly: true,        //只读
				indentUnit: 4, //缩进格数
				smartIndent: true, //自动缩进，设置是否根据上下文自动缩进（和上一行相同的缩进量）。默认为true。
				cursorHeight: 0.85, //光标高度。默认为1，也就是撑满行高。对一些字体，设置0.85看起来会更好。
				Autofocus: true, //初始时是否自动获取焦点boolean
				styleActiveLine: true, //设置光标所在行高亮true/false
				autoCloseBrackets: true,
				lint:true,
				hintOptions: {
				          completeSingle: false
				},

			});
			editor.setSize("auto", "200px");
			$(".CodeMirror").css("border", "solid 1px #cecece");
			$(".CodeMirror").css("border-radius", "5px");
			editor.on("keypress", () => {
			        editor.showHint();
			});
			editorFlag = false;
		}

		$('.code-section-container').toggleClass('show-code');
		$("#h6Test").css("display", "block");
		$(".CodeMirror").css("display", "block");
		$("#selectTheme").css("display", "block");
		$("#selectFormat").css("display", "block");
		$("#selectLength").css("display", "block");
		$("#submitCode").css("display", "block");
		$("#runCode").css("display", "block");
		flag = true;

	}
}
var input = document.getElementById("select");
var input2 = document.getElementById("format");
var input3 = document.getElementById("length");

function selectTheme() {
    var theme = input.options[input.selectedIndex].textContent;
    editor.setOption("theme", theme);
    location.hash = "#theme:" + theme;
}

function selectFormat() {
    var format = input2.options[input2.selectedIndex].textContent;
	var prefix = "text/";
	if (format =="java") {
		format = "x-"+format;
	}else if (format == "aspx") {
		prefix = "application/";
		format = "x-"+format;
	}else if (format == "jsp") {
		prefix = "application/";
		format = "x-"+format;
	}else if (format == "json") {
		prefix = "application/";
	}else if (format == "python2") {
		format = "x-"+format;
	}else if (format == "python3") {
		format = "x-"+format;
	}else if (format == "cython") {
		format = "x-"+format;
	}else if (format == "shell") {
		format = "x-"+format;
	}else if (format == "php") {
		format = "x-"+format;
	}else if (format == "sql") {
		format = "x-"+format;
	}else if (format == "mysql") {
		format = "x-"+format;
	}else if (format == "mariadb") {
		format = "x-"+format;
	}else if (format == "hive") {
		format = "x-"+format;
	}else if (format == "lua") {
		format = "x-"+format;
	}else if (format == "go") {
		format = "x-"+format;
	}else if (format == "nginx") {
		format = "x-nginx-conf";
	}else if (format == "vue") {
		format = "x-"+format;
	}else if (format == "markdown") {
		format = "x-"+format;
	}else if (format == "xml") {
		prefix = "application/";
	}else if (format == "yaml") {
		format = "x-"+format;
	}else if (format == "c") {
		format = "x-csrc";
	}else if (format == "c++") {
		format = "x-c++src";
	}else if (format == "scala") {
		format = "x-"+format;
	}else if (format == "kotlin") {
		format = "x-"+format;
	}
    editor.setOption("mode", prefix+format);
    location.hash = "#format:" + format;
}

function selectLength() {
    var length = input3.options[input3.selectedIndex].textContent;
    editor.setSize("auto",length+"px");
    location.hash = "#length:" + length+"px";
}