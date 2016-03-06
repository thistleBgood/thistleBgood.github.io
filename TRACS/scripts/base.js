window.onload = function() {
		var fileInput = document.getElementById('fileInput');
		var fileDisplayArea = document.getElementById('fileDisplayArea');

		fileInput.addEventListener('change', function(e) {
			var file = fileInput.files[0];
			var reader = new FileReader();

			reader.onload = function(e) {
				console.log("Importing " + file.name);
				preProcess(fileDisplayArea, reader.result);
			}


			reader.readAsText(file);
		});
		
}


function preProcess (fileDisplayArea, text) {
	
	while (fileDisplayArea.hasChildNodes()) {
		fileDisplayArea.removeChild(fileDisplayArea.lastChild);
	}
	
	
	
	lines = text.split("\n");
	
	var programNode = document.createElement("div");
	programNode.setAttribute("class", "program");
	
	for (i in lines) {
        console.log(lines[i])
		
		var newNode = document.createElement("div");
		newNode.setAttribute("class", "statement");
		if (lines[i] == "") {
			newNode.innerHTML = "&nbsp;";
		} else {
			newNode.innerText = lines[i];
		}
		newNode.setAttribute("id", "range_" + i)
		programNode.appendChild(newNode);
	}
	
	fileDisplayArea.appendChild(programNode)
	document.getElementById("annotate").removeAttribute("disabled")
	
	localStorage.setItem("count", lines.length)

			document.getElementById("radios").setAttribute("style", "display: default");
			document.getElementById("dcfbutton").setAttribute("style", "display: default");
}



// Code to add annotation areas






load_dcf_tools = function() {

	var code_area_content = document.getElementById("fileDisplayArea");

	document.getElementById("layout").setAttribute("style","width: 100%; height: 600px");

	code_area_content.setAttribute("style", "background: none;");
	var pstyle = 'border: 1px solid #dfdfdf; padding: 5px;';
	$('#layout').w2layout({
		name: 'layout',
		padding: 4,
		panels: [
			{ type: 'left', size: "30%", resizable: true, style: pstyle, content: code_area_content, style: 'background: rgba(0,0,128,0.25);' },
			{ type: 'main', style: pstyle, content: 'Trace Table' },
			{ type: 'preview', size: "50%", resizable: true, style: pstyle, content: 'Evaluator' },
			{ type: 'right', size: "30%", resizable: true, style: pstyle, content: 'Files' }
		]
	});

	document.getElementById("dcfbutton").remove();
};
